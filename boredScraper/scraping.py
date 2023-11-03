from urllib.request import urlopen
from bs4 import BeautifulSoup
import time
import re


url = "https://boardgamegeek.com/browse/boardgame"

# page = urlopen(url)
# html = page.read().decode("utf-8")
# soup = BeautifulSoup(html, "html.parser")
# print(html)
# pattern = "<h2.*?>.*?</h2.*?>"
# name = re.search(pattern, html_text, re.IGNORECASE).group()
# clean_name = re.sub("<.*?>", "", name)
# # print(clean_name)

# # print(html[content:end_index])
# # print(re.findall("a.*?c", "acdcdcdmmcammcacacdcdcd"))
# # string = "Everything is <replaced> if it's in <tags>."
# # print(re.sub("<.*?>", "ELEPHANTS", string))

# for string in ["Name: ", "Favorite Color:"]:
#     string_start_idx = html_text.find(string)
#     text_start_idx = string_start_idx + len(string)

#     next_html_tag_offset = html_text[text_start_idx:].find("<")
#     text_end_idx = text_start_idx + next_html_tag_offset

#     raw_text = html_text[text_start_idx : text_end_idx]
#     clean_text = raw_text.strip(" \r\n\t")
#     # print(clean_text)

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

for id in top1000_game_ids[:1]:
    api_url = base_url + id + "?stats=1"
    print(api_url)
    api_page = urlopen(api_url)
    api_html = api_page.read().decode('utf')
    api_soup = BeautifulSoup(api_html, 'html.parser')
    # print(api_soup)
    name_html = api_soup.find("name", primary=True)
    name = name_html.text
    publisher_html = api_soup.find("boardgamepublisher")
    publisher = publisher_html.text
    minplayers_html = api_soup.find("minplayers")
    minplayers = minplayers_html.text
    maxplayers_html = api_soup.find("maxplayers")
    maxplayers = maxplayers_html.text
    min_game_length_html = api_soup.find("minplaytime")
    min_game_length = min_game_length_html.text
    max_game_length_html = api_soup.find("maxplaytime")
    max_game_length = max_game_length_html.text
    genre_html = api_soup.find("boardgamesubdomain")
    genre = genre_html.text
    img_html_index = api_html.find("<image>") + 7
    img_html_end_index = api_html.find("</image>")
    img_url = api_html[img_html_index:img_html_end_index]
    thumbnail_html = api_soup.find("thumbnail")
    picture_url = [thumbnail_html.text, img_url]
    theming_html = api_soup.find_all("boardgamecategory")
    themes = []
    for theme in theming_html:
        themes.append(theme.text)
    bgg_rating_html = api_soup.find("average")
    bgg_rating = bgg_rating_html.text
    game_mechanics_html = api_soup.find_all("boardgamemechanic")
    mechanics = []
    for mechanic in game_mechanics_html:
        mechanics.append(mechanic.text)
    description_html = api_soup.find("description")
    description = description_html.text
    print({
        'name': name, 
        "publisher": publisher, 
        "minplayers": minplayers, 
        "maxplayers": maxplayers, 
        "min playtime": min_game_length, 
        "max playtime": max_game_length, 
        "genre": genre, 
        "picture url": picture_url,
        "themes": themes,
        "bgg rating": bgg_rating,
        "comments": [],
        "game mechanics": mechanics,
        "description": description
        })
