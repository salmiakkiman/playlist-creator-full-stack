from bs4 import BeautifulSoup
import requests

# scrape lyrics from given url
# scrape target: genius.com
def lyricsUrl(url):
  print('fetchin lyrics from ', url)
  page = requests.get(url)
  html = BeautifulSoup(page.text, 'html.parser')
  lyrics = html.find('div', class_='lyrics').get_text()
  return lyrics
