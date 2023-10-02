from models.accounts import Account, AccountIn, AccountOut
from queries.accounts import AccountQueries, DuplicateAccountError
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from auth import authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str
router = APIRouter(tags=["accounts"])

@router.post("/api/accounts/", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An Account With Those Credentials",
        )

    form = AccountForm(username=info.username, password=info.password)

    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())

@router.get("/api/accounts/", response_model=list)
async def get_all_accounts(queries: AccountQueries = Depends()):
    return queries.get_all_accounts()

@router.get("/api/accounts_id/{account_id}", response_model=AccountOut)
async def get_account_by_id(
    account_id: str,
    response: Response,
    queries: AccountQueries = Depends(),
):
    account = queries.get_account_by_id(account_id)
    if account is None:
        response.status_code = 404
    else:
        return account
    
@router.get("/api/accounts/{username}", response_model=AccountOut)
async def get_account(
    username: str,
    response: Response,
    queries: AccountQueries = Depends(),
):
    account = queries.get_account(username)
    if account is None:
        response.status_code = 404
    else:
        return account
    
@router.put("/api/accounts/{account_id}/", response_model=AccountToken | str)
async def update_account(
    account_id: str,
    account_in: AccountIn,
    request: Request,
    response: Response,
    queries: AccountQueries = Depends(),
):
    if account_in.password:
        hashed_password = authenticator.hash_password(account_in.password)
    else:
        hashed_password = None
    try:
        account = queries.update_account(account_id, account_in, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An Account With Those Credentials",
        )
    form = AccountForm(username=account_in.username, password=account_in.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())

    
@router.put("/api/accounts_without/{account_id}/", response_model=AccountOut | str)
async def update_account_without(
    account_id: str,
    account_in: AccountIn,
    response: Response,
    queries: AccountQueries = Depends(),
):
    account = queries.update_account_without(account_id, account_in)
    if account is None:
        response.status_code = 404
    else:
        return account

@router.delete("/api/accounts/{account_id}/", response_model=bool | str)
async def delete_account(
    account_id: str,
    response: Response,
    queries: AccountQueries = Depends(),
):
    account = queries.delete_account(account_id)
    if account is None:
        response.status_code = 404
    else:
        return True
    
@router.get("/api/token/", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:

    if authenticator.cookie_name in request.cookies:
        token_data = {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
        return AccountToken(**token_data)