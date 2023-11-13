from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import json
# from routers.games import create_game
import asyncio
from queries.games import GameQueries
from pymongo import MongoClient
import os

async def main():
    game_queries = GameQueries()
    url = "https://boardgamegeek.com/browse/boardgame"
    base_url = "https://boardgamegeek.com/xmlapi/boardgame/"
    url_page = url + "/page/"

    top10_pages = []
    top1000_game_ids = []

    for i in range(10):
        i = i+1
        top10_pages.append(f"{url_page}{i}")

    for url in top10_pages:
        open_page = urlopen(url)
        html = open_page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        for link in soup.find_all("a", href=True, class_=True):
            link_href = link["href"]
            link_class = link["class"]
            id_and_name = link_href[11:]
            slash_index = id_and_name.find("/") + 11
            if link_class == ["primary"]:
                top1000_game_ids.append(link_href[11:slash_index])
            else:
                continue

    for id in top1000_game_ids:
        api_url = base_url + id + "?stats=1"
        api_page = urlopen(api_url)
        api_html = api_page.read().decode('utf')
        api_soup = BeautifulSoup(api_html, 'html.parser')
        name_html = api_soup.find("name", primary=True)
        publisher_html = api_soup.find("boardgamepublisher")
        minplayers_html = api_soup.find("minplayers")
        maxplayers_html = api_soup.find("maxplayers")
        min_game_length_html = api_soup.find("minplaytime")
        max_game_length_html = api_soup.find("maxplaytime")
        genre_html = api_soup.find("boardgamesubdomain")
        img_html_index = api_html.find("<image>") + 7
        img_html_end_index = api_html.find("</image>")
        img_url = api_html[img_html_index:img_html_end_index]
        thumbnail_html = api_soup.find("thumbnail")
        theming_html = api_soup.find_all("boardgamecategory")
        themes = []
        for theme in theming_html:
            themes.append(theme.text)
        bgg_rating_html = api_soup.find("average")
        game_mechanics_html = api_soup.find_all("boardgamemechanic")
        mechanics = []
        for mechanic in game_mechanics_html:
            mechanics.append(mechanic.text)
        description_html = api_soup.find("description")
        game = {
            "name": name_html.text,
            "publisher": publisher_html.text,
            "min_players": int(minplayers_html.text),
            "max_players": int(maxplayers_html.text),
            "min_game_length": int(min_game_length_html.text),
            "max_game_length": int(max_game_length_html.text),
            "genre": genre_html.text,
            "picture_url": [
                thumbnail_html.text, 
                img_url
            ],
            "websites": [
                "n/a"
            ],
            "theming": themes,
            "rules": "n/a",
            "formats": [
                "n/a"
            ],
            "bgg_rating": float(bgg_rating_html.text),
            "ratings": [
                0
            ],
            "comments": [
                "n/a"
            ],
            "game_mechanics": mechanics,
            "description": description_html.text.replace("<br/>", "\n")
            }
        await game_queries.scraper_create_game(game)

if __name__ == "__main__":
    asyncio.run(main())