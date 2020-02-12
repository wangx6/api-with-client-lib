## What this project is trying to demostrate?
- High level architecture design (tier based design and clearly define the responsibility for each.)
- Low level architecture design (modules, components)
- ES6 (server is built with ES6)
- Vanilla JS (frontend is built with vanilla JS)
- File structure design and setup
- Styling setup
- Setup build process for both frontend and backend
- Relational DB design
- Frontend library efficient implementation
- Unit testing approach(both TDD - unit and BDD - feature)
- Unit testing - mock data, mock implementation, async handling, etc. (please look at "base.model.js" file)
- CI setup
- Web security solutions
- API activities monitoring and logging solutions
- Request caching handling
- Performant codeing in both frontend and backend
- Data compression

## How To Setup    
step 0: Install mysql database. (xampp) After the installation, run Apache and Mysql.  
step 1: Run the following command to install all app & app-dev dependencies. 
```shell 
npm install
```    
 
step 2: 
In order to setup the database run the following command.
```shell
npm run db
```  
step 3: run the following command to start the `api` and the `ui`  .
```shell
npm run dev
```  

step 4: run ui application by running the following link in your browser.  
```shell
http://localhost:9090/client/dist/
```  

Unit Testing
Run following command.  
```shell
npm run test OR npm run test:watch
```  

## Components Based Diagram        
![alt text](https://github.com/wangx6/api-with-client-lib/blob/master/docs/components-based.diagram.PNG?raw=true "Components Based Diagram")
[lucidchart shareable link](https://www.lucidchart.com/invitations/accept/902232a3-effc-4326-a376-a166a3480d79)



## File Base Diagram  
A file based diagram can be useful for fast knowlege transfer or debugging. Not only it provides an overview of all the files that are involved but also offers us a visual of the files combined with its responsibility within the entire system.
![alt text](https://github.com/moshea/teckro-wangx6/blob/develop/docs/file-based.diagram.PNG "File Based Diagram")
[lucidchart shareable link](https://www.lucidchart.com/invitations/accept/a801f66e-0ef2-47c8-9ecc-c276dcbd12d3)


## Author     
Yinghan Wang, wangx6@gmail.com
