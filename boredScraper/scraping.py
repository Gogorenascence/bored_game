from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


url = "https://boardgamegeek.com/browse/boardgame"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")
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

base_url = "https://boardgamegeek.com/xmlapi/"
url_page = url + "/page/"

top100_pages = []
top10000_game_ids = []

for i in range(100):
    i = i+1
    top100_pages.append(f"{url_page}{i}")

for page in top100_pages:
    for link in soup.find_all("a", href=True, class_=True):
        link_href = link["href"]
        link_class = link["class"]
        id_and_name = link_href[11:]
        slash_index = id_and_name.find("/") + 11
        if link_class == ["primary"]:
            top10000_game_ids.append(link_href[11:slash_index])
        else:
            continue

print(top10000_game_ids[0:10])