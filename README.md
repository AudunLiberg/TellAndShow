# TellAndShow

*[Prøv Tell and Show her.](http://folk.ntnu.no/audunlib/tellandshow/)*

«Show, don't tell» sies det, men hvorfor skal man ikke kunne få begge? Tell and Show er søkemotoren som gir deg i både pose og sekk. Etter å ha fortalt hva du leter etter, får du nemlig opp en forhåndsvisning av hvert treff. Du trenger ikke lenger falkeblikk for å finne siden du leter etter i mylderet av tekst på resultatsiden. Du blar deg ganske enkelt gjennom en liste med bilder og velger siden som virker mest lovende. Et bilde sier mer enn tusen ord, vet du.

**Tell and Show:** you _**tell**_, we _**show**_.

## Virkemåte

Du kan bruke Tell and Show uten å ta hendene fra tastaturet:

1. Skriv inn din søkefrase.
1. Trykk Enter.
1. Naviger deg gjennom resultatene med piltastene.
1. Trykk Enter.

Har ikke enheten din et tastatur? Fortvil ikke, løsningen fungerer like godt på mobil og nettbrett som på PC.

## Teknologien bak

Tell and Show skyter ikke spurv med kanoner. Systemet består ikke av mer enn et titalls kodelinjer, støttet av et lite knippe teknologier og ressurser:

* Forhåndsvisning av nettsider via iframes.
* Manipulering av DOM-en med jQuery.
* Grafikk fra [Font Awesome](http://fontawesome.io/).

## Crawleren

Bak enhver vellykket mann står en sterk kvinne. Bak enhver vellykket søkemotor står en sterk crawler. Tell and Shows crawler er skrevet i Python, og kan oppsummeres slik:

* [Requests](http://docs.python-requests.org/en/master/) for nedlasting av sider og kontakt med API.
* [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) for parsing av HTML.
* [urllib.parse](https://docs.python.org/3/library/urllib.parse.html#module-urllib.parse) for behandling av URL-er.
