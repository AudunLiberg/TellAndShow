import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urlsplit, urldefrag

def index(data):
        api_url = 'https://abakus-api-dot-sinuous-tine-156112.appspot.com/'
        api_key = 'ba2179ed-1744-445e-b5ce-c4ff0f016410'
        url = api_url + api_key + '/put'
        r = requests.post(url, json=data)
        print(r.status_code)

def crawl(base_url):
        base_host = urlparse(base_url).hostname
        crawling_queue = [base_url]
        crawled = set()
        found_data = []
        id = 0
        while crawling_queue:
                id += 1
                url = crawling_queue.pop()
                r = requests.get(url)

                # Do not crawl other multimedia (could be interesting to add in the future)
                if not r.headers['Content-Type'].startswith('text/html'):
                        continue
                
                url_host = '{uri.scheme}://{uri.netloc}'.format(uri=urlparse(url))
                html = r.text
                soup = BeautifulSoup(html, 'html.parser')
                title = soup.title.string
                contents = soup.main.get_text(' ', strip=True)

                # Hash the content of the site to prevent indexing of duplicates
                # It's resource demanding, but weeds out various 404's, url's with useles GET parameters etc.
                # Reduces number of indexed pages from 492 to 250, partially due to inconsistent use of www in href's, which could probably be fixed someway else
                sig = hash(contents)
                if sig in crawled:
                        continue
                crawled.add(sig)

                # Add site and contents to list for later indexing
                found_data.append({
                        "id": str(id),
                        "title": title,
                        "contents": contents,
                        "url": url
                })

                # Print url to track progess
                print(url)

                # Iterate hyperlinks and add them to crawling queue
                for link in soup.find_all('a'):
                    href = link.get('href')

                    # Skip link if not interesting
                    if not href or href.startswith('#') or href.startswith('mailto:'):
                            continue

                    href = urldefrag(urlsplit(parse_url(href, url_host)).geturl())[0]
                    host = urlparse(href).hostname
                    if host.endswith(base_host) and href not in crawling_queue:
                            crawling_queue.append(href)

        return found_data
                    
def parse_url(url, base):
        if is_absolute(url):
                return url
        else:
                return base + url

def is_absolute(url):
    return bool(urlparse(url).netloc)

data = crawl('http://computas.com/')
index(data)
