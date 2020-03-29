from requests import Session
from bs4 import BeautifulSoup as bs
import csv
import pprint

#open csv file
with open("movie_data.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["title", "poster", "director", "writers", "cast", "genre", "runtime", "description"])
    file.close()

#url for top 100 movies IMDB
url_top_100 = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm"

#url base for each top 100 title
url_title = "https://www.imdb.com"


#start session
br = Session()

#get top 100 response
top_100_response = br.get(url_top_100)

#parse top 100 response
top_100_parsed = bs(top_100_response.text, "html.parser")

#pull all tiles links from page
movie_table = top_100_parsed.find("table", {"class": "chart"})

titles = movie_table.findAll("td", {"class": "titleColumn"})


for data in titles:
    try:
        link = data.find("a")
        title_link = link["href"]

        movie_data = br.get(url_title + title_link)
        movie_data_parsed = bs(movie_data.text, "html.parser")

        title = movie_data_parsed.find("div", {"class": "title_wrapper"}).find("h1").getText() #title
        movie_specs = movie_data_parsed.find("div", {"class": "title_wrapper"}).find("div", {"class": "subtext"})

        genres = []    #generes
        runtime = movie_specs.find("time") != None and movie_specs.find("time").getText().strip() or "---"

        for genre in movie_specs.findAll("a"):
            genres.append(genre.getText())

        genres.pop()

        movie_poster = movie_data_parsed.find("div", {"class": "poster"}).find("img")["src"]   #movie poster url
        movie_summary = movie_data_parsed.find("div", {"class": "plot_summary_wrapper"})
        plot_summary = movie_summary.find("div", {"class": "summary_text"}).getText().strip()  #movie plot summary

        director = []  #directors
        writers = []   #writeres
        cast = []      #cast


        credits = movie_data_parsed.findAll("div", {"class": "credit_summary_item"})

        #get director
        for credit in credits[0].findAll("a"):
            director.append(credit.getText())

        #get writers
        for credit in credits[1].findAll("a"):
            if not credit.getText() in writers and credit.getText()[-6:] != "credit" and credit.getText()[-7:] != "credits":
                writers.append(credit.getText())

        #get cast and cast image
        for credit in credits[2].findAll("a"):
            if credit.getText()[-4:] != "crew":
                actor = []
                actor.append(credit.getText())
                actor_link = url_title + credit["href"]

                actor_page = br.get(actor_link)
                actor_parsed = bs(actor_page.text, "html.parser")

                actor_img = actor_parsed.find("td", id="img_primary").find("img", id="name-poster")["src"]
                actor.append(actor_img)
                cast.append(actor)


        with open("movie_data.csv", "a", newline="", encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow([title, movie_poster, director, writers, cast, genres, runtime, plot_summary])
            file.close()

        print(title)

    except TypeError:
        print("Error:")

    except AttributeError:
        print("Error:")
