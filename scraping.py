import requests
from bs4 import BeautifulSoup
import re
import itertools
import flask
from flask import Flask, render_template, request, redirect, url_for
import cgi

# app = Flask(__name__)

# @app.route('/', methods=['GET', 'POST'])
# def index():
#     if request.method == 'POST':
#         user_input = request.form['website_url']
#         return f"User input: {user_input}"
#     return render_template('main.html')

# if __name__ == '__main__':
#     app.run(debug=True)

# form_inputs = cgi.FieldStorage()

# print(str(form_inputs.getvalue('website_url')))

app = Flask(__name__)

todos = {}

@app.route("/")
@app.route("/home")
def home():
    return render_template('main.html')

@app.route('/main', methods = ['GET', 'POST'])
def main():
    if request.method == "POST":
        user_input = request.form.get('website_url')
        print(user_input)
        return redirect(url_for("home"))
    return render_template('main.html')
        
if __name__ == "__main__":
    app.run(debug=True,port=5000)





# url2 = "http://127.0.0.1:5501/main.html"
# r = requests.get(url2)
# soup = BeautifulSoup(r.text, "html")
# print(soup)

# email = soup.fud(["p", "a"], string=emailRegx)


# inputs=soup.find("input", {"id": "url"})
# print(inputs[0]['value'])

url = "http://nativespanishtutor.ca/"
r = requests.get(url)
# print(r.status_code)

# soup = BeautifulSoup(r.text,"html.parser")

# name = soup.find_all('div', class_="topnav")
# print(name)
# print(soup)
phoneNumber = ""
address = ""
email = ""

# np = "contact.html"
# cnp = "http://nativespanishtutor.ca/"+np
# print(cnp)
# r = requests.get(cnp)
soup = BeautifulSoup(r.text,"lxml")
# print(soup.prettify())

links = [link['href'] for link in soup.find_all('a', href=True)]
print(links)

substrings = ["contact", "Contact", "CONTACT", "ContactAt",  "ContactUs", "contactAt", "contactUs"]


#check if any of the links contain 

for i in range(0, 5):
    if substrings[0] in links[i] or substrings[1] in links[i] or substrings[2] in links[i] or substrings[3] in links[i] or substrings[4] in links[i] or substrings[5] in links[i] or substrings[6] in links[i]:
        np = links[i]
        break


cnp = url + np
print(cnp)
r = requests.get(cnp)
soup = BeautifulSoup(r.text,"html.parser")
print(soup.prettify())

#validate email -- reex for valid email in python
# emailRegx = re.compile(r'([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)*')
emailRegx = re.compile('([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
#Note: ^ and $ would normally be used to check for expression is solely the phone number however sometimes there can contain addition text in the tag
phoneNumberRegx = re.compile('((\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})')

# addressRegx = re.compile(r'[a-zA-Z0-9\s\-\.,\'#&]+$', re.UNICODE)
addressRegx = re.compile('(\\d{1,}) [a-zA-Z0-9\\s]+(\\,)? [a-zA-Z]+(\\,)? [A-Z]{2}')

address = "2751 Partington Ave, Windsor, ON , Canada"
# address = "2384 Glenwood Ave, Windsor, ON"

x = re.search('(\\d{1,}) [a-zA-Z0-9\\s]+(\\,)? [a-zA-Z]+(\\,)? [A-Z]{2}', address)
print(x)

#will iterate through scraped page for email and find all valid emails
# email = [x for x in soup.strings if emailRegx.search(x).group()]

# gfg = soup.find(lambda tag: tag.name == "p" and "ivanna.arias9@gmail.com" in tag.text)
email = soup.find_all(["p", "a"], string=emailRegx)
phone_number = soup.find_all(["p", "a"], string=phoneNumberRegx)
address = soup.find_all(["p", "a"], string=addressRegx)
# gfg = soup.find(["p"], string="E-mail: ivanna.arias9@gmail.com")

print(email)
print(email[0].get_text())
match1 = re.search('[\w.+-]+@[\w-]+\.[\w.-]+', email[0].get_text())
print(match1.group(0))

print("--------------------")

print(phone_number)
print(phone_number[0].get_text())
match2 = re.search('(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}', phone_number[0].get_text())
print(match2.group(0))

print("----------------------")
print(address)
print(address[0].get_text())
match3 = re.search('(\\d{1,}) [a-zA-Z0-9\\s]+(\\,)? [a-zA-Z]+(\\,)? [A-Z]{2}', address[0].get_text())
print(match3.group(0))





#if it cant be extracted directly
# if (email == []):
#     for para in soup.find_all("p"):
#         print(para.get_text())

#     string = ("E-mail: ivanna.arias9@gmail.com\n"
#         "Phone Number: (519) 969-1655\n"
#         "Address: 2384 Glenwood Ave, Windsor, ON\n")
    
#     splitString = string.split(": ") 

#     for i in range(0, len(splitString)):
#         string = splitString[i].splitlines()

#         #find a way to concatenate to one string of strings
#         contents = list(itertools.chain(string))
#         print(string)



#use links to check for a substring named contact, Contact or CONTACT or contactUs or ContactUs


# questions = soup.find_all('div', {})

# while True:
#     np = soup.find("a", class_="topnav").get("href")
#     print(np)
#     cnp = "http://nativespanishtutor.ca/"+np
#     print(cnp)

    # url = cnp
    # r = requests.get(url)
    # soup = BeautifulSoup(r.text, "html.parser")
