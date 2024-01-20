# Route
http://localhost:8080/

Note:

Most functions don't return at all if it fails so read the error printed in terminal

## User (/user/)
### create
params: email, password
returns: "Added!"

### login
params: email, password

returns: token

## Class (/class)
### create
params: token, name, date

returns: "Added!"


## Entry (/entry)
### create
params: token, class_id, score, date

returns: "Recorded!"

### update
params: token, id (entry id), score 

returns: "Updated!"

### reqByDay
params: token, class_id, date

returns: entries

### reqByThisWeek
TODO