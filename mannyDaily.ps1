Write-Host "This should run Manny's entire day"
Get-ChildItem -Path C:\Users\lewis\Desktop\Mafia
Invoke-Command -ScriptBlock {java -jar .\kolmafia-latest.jar 'C:\Users\lewis\Desktop\Mafia\mannylogin.txt' --CLI}
$result = Get-Content C:\Users\lewis\Desktop\Mafia\data\wrapperresult.txt
$wshell = New-Object -ComObject Wscript.Shell
$Output = $wshell.Popup($result)
Remove-PSSession -ComputerName .