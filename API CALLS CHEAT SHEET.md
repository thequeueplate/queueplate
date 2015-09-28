###############################                          ###############################
##########################       API CALLS CHEAT SHEET        ##########################
###############################                          ###############################


---------- SINGLE DISH ------------

::: GET :::
api/menuitems/:menuitemid

::: POST :::

api/menuitems/:menuitemid

---------- MENU ------------

menu by restaurant ---> api/rests/:restid/menu

---------- USERS ------------

all users --->api/users
user by id ---> api/users/:userid

----------  RESTAURANTS ---------- 

all restaurants ---> api/rests/
restaurants by id ---> api/rests/:restid

----------  SECTIONS ---------- 

all sections by restaurant ---> api/rests/:restid/menu, then dig in to object for sections

----------  ORDERS ---------- 

::: POST :::
order from customer ---> api/rest/:restid/:userid 
     + status of dish 
     	-placed
     	-received 
     	-started 
     	-completed 
     	-delivery 
     	-delivered
refers to menuItemId (dish) ---> api/orders/item/:orderid/:itemid
	+ quantity
	+ comments

::: GET :::
orders by restaurant ---> api/rest/:restid 
orderItem by id --->  api/orders/item/:itemid 
orders by userid ---> api/user/:userid 

----------  FAVORITE ODERS ---------- 




