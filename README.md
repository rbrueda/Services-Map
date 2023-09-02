# Services-Map
A platform that allows users to advertize their service displayed on a Google Map and let users to search for a service. This project is built on Javascript, HTML, CSS, and Python. In addition, this platform uses the Google Maps API to generate a map, where markers are shown for services. The Python library BeautifulSoup is used to scrape contact information from service websites to autofill users' credential info. The web application framework Flask is used to receive website input from HTML to a Python variable which scrapes the website and returns Python variables that are displayed in HTML format.

Other features of this platform are: 
1. Info window pop up that displays service credentials when the marker is clicked
2. Users can also search for services using the drop-down button and clicking on the "Find" button
3. Users can delete a key by clicking on a marker to retrieve the info window and clicking on the "Delete" button
4. To ensure that the marker was not deleted by someone else, a two-step verification system, which uses SMTP, sends a verification code to the service email
5. The help button is displayed on the top of page for the case in which users have any concerns or want to know more about the service-map platform
6. Incorportated the use of regular expressions to ensure correct format of email, phone and address are being used when user inputs credentials
7. When user clicks on the "Credentials Shortcut" button after inserting a URL link in the website input field, some of credentials (such as email, phone number, address) can be autofilled

## Run Service Map Instructions
1. Clone the project

```bash
  git clone https://github.com/rbrueda/Services-Map
```
2. Install node.js and npm
3. Install dotenv node package (optional for securing api)
4. Create a Google Cloud account and create a new project
5. Go to Console > APIs and Services > Credentials > Create Credentials and click "API Key" to create new key
6. To protect you api key go to "Edit you API Key" and change to your domain in "Website restrictions"
7. To run your Google Maps interface create new file named "config.js" and add info: ```javascript(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})```
    ({key: {YOUR_API_KEY}, v: "weekly"});
8. Alternative: directly putting it on main.html file using <script> tags
9. Install python packages: flask, validators, beautifulsoup4, regex, and requests.
Use command: ```bash"sudo pip3 install {package-name}"```

10. Run the Service Map server by runnning command python3 app.py (name of python file where Flask is executed) with respect to the Python path file directory

- *ADDITIONAL NOTES: the regular expressions used in "main.js" and "app.py" only work for limitted test cases (for example may not validate phone numbers in some formats), if new restrictions or add-ons are needed, feel free to alter them*

## Screenshots
![Service Map 1](https://github.com/rbrueda/Services-Map/assets/93105329/8b802e22-2897-4b45-85dd-11d8d73f791b)
![Service Map 2](https://github.com/rbrueda/Services-Map/assets/93105329/f529fade-9720-412c-a2b7-de064b91e180)
![Service Map 3](https://github.com/rbrueda/Services-Map/assets/93105329/fd473d87-8666-4676-9648-6c20088038ba)
![Service Map 4](https://github.com/rbrueda/Services-Map/assets/93105329/ec4dff46-723d-4f09-995f-b5c78ea41eba)
![Service Map 5](https://github.com/rbrueda/Services-Map/assets/93105329/ab10eb16-71b7-4b66-9a41-7d61b90be2b5)


## Demo Video
https://youtu.be/hVtAAZ4c4fk

## License
[MIT](https://github.com/rbrueda/Services-Map/blob/main/LICENSE)

