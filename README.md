# vscode-action
vscode into Github Actions for troubleshooting.





## Step 1: Add the Action 

Add the `mchirico/vscode-action@v1` to your action. Below is a complete action yaml. 


### .github/workflows/blank.yml
```
name: Sample Test Run with vscode

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:

  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
      

    - name: Run a multi-line script
      run: |
        echo Hello 

        
    # *** This goes after the problem. ****
    - uses: mchirico/vscode-action@v1
      with:
        ngrok_token: ${{ secrets.NGROK_TOKEN }}
        vscode_port: 8779
        wait_duration: 1hr


```


## Step 2: Sign up to [ngrok](https://ngrok.com/)

The free ngrok account works fine.  Copy the token.


<img src='https://user-images.githubusercontent.com/755710/89712989-7ae3e700-d962-11ea-942b-723742964839.png' width=670 />



## Step 3: Add token to Github Secrets


<img src='https://user-images.githubusercontent.com/755710/89713057-12493a00-d963-11ea-9f96-e8d2459913b8.png' width=670 />




## Step 4:

<img src='https://user-images.githubusercontent.com/755710/89713149-db275880-d963-11ea-8be5-9ce36f504b80.pn' width=670 />




## Step 5: Run the Action


<img src='https://user-images.githubusercontent.com/755710/89713326-05c5e100-d965-11ea-93ee-b93c76e708e5.png' width=670 />



## Step 6: 





