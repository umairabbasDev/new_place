# New place
Ensure that docker is already installed and running in your environment
# Follow the steps to clone and run the project on docker 

## Step 1
```git clone git@github.com/umairabbasDev:new_place.git```

## step 2 
- rename the .envcopy file to .env
- make sure to add api keys in .env

## Step 3
Go to project's  root directory and run the following command 
```docker build -t new-place .```
This command will create the image of the application

## Step 4
Run the following command to build the container of the image created in 1st step
```docker run -p 5173:5173 new-place```
## Step 5
Make sure that your container is running in the background so you can access the application. Run the following command to see the running containers
```docker ps```
this will show you all the running containers including `new-place` container

Open localhost:5173 on you browser to the the application 


### created with :
- React
- TypeScript
- Vite
- Redux
- DaisyUI
- Docker
