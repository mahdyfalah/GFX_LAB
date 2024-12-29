# Lab0

## Programming
everything needed to run should already be included in the project including
3d models etc.

- to run the app: <br>
navigate to Lab1b dir in Terminal and run <br> 
```npm install -g lite-server``` <br>
then stat the app by running <br>
```lite-server``` <br>
you can access the application on <br>
```http://localhost:3000/```


- alternatively you can run the app by: <br>
```npx http-server``` <br>
but this lacks the auto-refresh functionality on code updates

## Claim
I have tried to implement every main task (excluding bonuses)

- task 1: <br>
implementation of Gouraud/diffuse shaders can be found in shaders/gouraud/diffuse/...
- task 2 : <br>
  implementation of Gouraud/specular shaders can be found in shaders/gouraud/specular/...
- task 3: <br>
  implementation of phong/diffuse shaders can be found in shaders/phong/diffuse/...
- task 4: <br>
  implementation of phong/specular shaders can be found in shaders/phong/specular/...
- task 5: <br>
  interactions with light both a and b.
  the implementation can be found in keyboardEventHandler.js
  where I have added new function and a new param to switch and handle transformations
  to light or objects.
  to make switching between shaders seamless I updated the canvasSetupHelper.js so that 
  all shaders are loaded and compiled at the start with their attributes/uniforms on a 
  map with keys to each shader program.
  The user can switch between each at the will and all required params are stored on the
  newly created globals.js
  rotations and translations of the light is also possible when "L" on keyboard is pushed
  , and they have similar logic to shapes, but as the light is not a Shape object and
  is not on the shapes array, they are directly changing the light position.

## Tested environments
I have implemented and tested my app on my Windows PC using intellij and chrome

## Additional and general remarks
I have used multiple sources in order to implement shaders this includes:
course and Q&A material from this semester and also Ideas from source code of 
previous semester.

this includes hints such as loading all shaders at the start, using maps instead of
simple array to switch between, hardcoded ambient/diffuse coefficients for simplicity, etc.