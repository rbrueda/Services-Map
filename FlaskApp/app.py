import requests
from bs4 import BeautifulSoup
import re
import flask
from flask import Flask, render_template, request, redirect, url_for
import validators
from flask import Flask, render_template

#initializes Flask 
app = Flask('Service Map')


#NOTE: This displays information on current directory and not on another page. If you want to autofil credentials on other page, you must use "/pathname"
@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        #initalizes errors as an empty string -- no errors yet
        errors = ""
        #initializes the input from url input field to text variable
        text = request.form.get('name')

        # uses validators library to check if variable text is a valid url
        if validators.url(text) == True:
            #send the request of the url
            r = requests.get(text)

            #parse request to readable lxml format
            soup = BeautifulSoup(r.text, "html.parser")

            #scans for all of the links in the main page
            links = [link['href'] for link in soup.find_all('a', href=True)]
            np = ""

            #checks if there is any contact pages 
            substrings = ["contact", "Contact", "CONTACT", "ContactAt",  "ContactUs", "contactAt", "contactUs"]

            #checks if any of the links contain the contact substrings AND contain ".html" 
            for i in range(0, 5):
                if substrings[0] in links[i] or substrings[1] in links[i] or substrings[2] in links[i] or substrings[3] in links[i] or substrings[4] in links[i] or substrings[5] in links[i] or substrings[6] in links[i]:
                    #check if link is an html file
                    if (".html" in links[i]):
                        #if there is a contact page sets the directory to that page
                        np = links[i]
                        break
            
            #ie. there is a contact page
            if (np != ""):
                cnp = text + np
                r = requests.get(cnp)
                #will parse info to new directory
                soup = BeautifulSoup(r.text,"html.parser")


            #validate email -- regx for valid email in python
            emailRegx = re.compile('([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
            #Note: ^ and $ would normally be used to check for expression is solely the phone number however sometimes there can contain addition text in the tag
            phoneNumberRegx = re.compile('((\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})')
            addressRegx = re.compile('(\\d{1,}) [a-zA-Z0-9\\s]+(\\,)? [a-zA-Z]+(\\,)? [A-Z]{2}')

            #find first tag with email, phone_number and address, if found
            email = soup.find(["p", "a"], string=emailRegx)
            phone_number = soup.find(["p", "a"], string=phoneNumberRegx)
            address = soup.find(["p", "a"], string=addressRegx)

            #assigns variables with will contain the email, address and phone_number to empty strings initially
            emailVar = ""
            phoneNumVar = ""
            addressVar = ""

            #checks if email was found
            if email is not None:
                match1 = re.search('[\w.+-]+@[\w-]+\.[\w.-]+', email.get_text())
                emailVar = match1.group(0)

            #checks if phone number was found
            if phone_number is not None:
                match2 = re.search('(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}', phone_number.get_text())
                phoneNumVar = match2.group(0)

            #checks if address was found
            if address is not None:
                match3 = re.search('(\\d{1,}) [a-zA-Z0-9\\s]+(\\,)? [a-zA-Z]+(\\,)? [A-Z]{2}', address.get_text())
                addressVar = match3.group(0)

            #will return new html template wth credential variables
            return render_template('main.html', email = emailVar, phone = phoneNumVar, address = addressVar, url=text)
        
        #if url was not valid, error message will be passed as a variable
        else:
            errors = "Invalid url entered for program"
            return render_template('main.html', errors = errors)
    #if action is not executed ("Credential Shortcut" button is not clicked) it will return html template without returning variables  
    else:
        return render_template("main.html")

#excecutes main function
if __name__ == '__main__':
    app.run(debug=True,port=5011)

