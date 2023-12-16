# CSV_Upload_CN
 CSV Upload Project for Coding Ninjas Skill Test


Libraries used:

	1. express
	2. mongoose
	3. node-sass-middleware
	4. nodemon
	5. ejs
	6. express-ejs-layouts
	7. bootstrap
	8. jquery
	9. noty js
	10. dotenv



Approach:

1) Know about csv files and how they are used for transporting data in text format
2) create sample csv files using excel
3) Since we need to upload only a CSV file, we have only one Schema
4) we need to show the csv file name, so add the property name to the CSV file Schema
5) Checks added on the front end
    a) File name doesn't exceed 100
    b) Only CSV files are shown in the input dialouge box
    c) There should be a file to be uploaded when the upload button is clicked
6) Checks added on the back end
    a) Same file name shouldn't exist (no duplication)
    b) Only CSV files are accepted, any other file is rejected and is not stored
7) for sorting, filtering, we have a temporary csv files array on the front end, that gets the csv files via data-attribute and displays them when the app loads