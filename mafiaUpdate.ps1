Get-ChildItem -Path C:\Users\lewis\Documents\GitHub\kolmafia
Invoke-Command -ScriptBlock {git checkout origin/main}
Invoke-Command -ScriptBlock {git pull upstream main}
Invoke-Command -ScriptBlock {git push prigin HEAD:main}
Invoke-Command -ScriptBlock {git checkout stupidmanny}
Invoke-Command -ScriptBlock {git pull upstream main}
Invoke-Command -ScriptBlock {git push}
Invoke-Command -ScriptBlock {./gradlew shadowJar}
Get-ChildItem -path C:\Users\lewis\Documents\GitHub\kolmafia\dist
