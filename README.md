# vscode-action
vscode into Github Actions for troubleshooting.





### Step 1: Sign up to [ngrok](https://ngrok.com/)

The free ngrok account works fine.  You'll need to token for Github Secrets. Copy the token.


<img src='https://user-images.githubusercontent.com/755710/89712989-7ae3e700-d962-11ea-942b-723742964839.png' width=670 />



### Step 2: Add token to Github Secrets

Next, add this token the Github Secrets.

<img src='https://user-images.githubusercontent.com/755710/89713057-12493a00-d963-11ea-9f96-e8d2459913b8.png' width=670 />



### Step 3: Add the Action 


Add the `mchirico/vscode-action@v1` to your action. Below is a complete action yaml. 
Normally you'd put this just before or just after the line you want to investiage.

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





### Step 4: Run the Action

The action will run until the wait_duration expires.  From above, it's set for 1hr... you 
may want more or less time.

<img src='https://user-images.githubusercontent.com/755710/89713326-05c5e100-d965-11ea-93ee-b93c76e708e5.png' width=670 />



### Step 5: Grab URL of tunnel

You'll need the url of the tunnel.

<img src='https://user-images.githubusercontent.com/755710/89713171-12960500-d964-11ea-8f5a-b0ba41d44a09.png' width=700 />


### Step 6: Launch vscode


You should be able to launch vscode.

<img src='https://user-images.githubusercontent.com/755710/89713240-656fbc80-d964-11ea-8827-9ea6081c57cb.png' width=700 />





