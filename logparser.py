import re
import sys

if len(sys.argv) == 1:
    print("You didn't supply an item to look for")
    sys.exit()

item = sys.argv[1]

checkdate = False

if len(sys.argv) > 2:
    date = sys.argv[2]
    checkdate = True
    
print(str((item)))

log = open("stashlog.txt", "r")

parsedlogadds = {}
parsedlogtakes = {}

for entry in log:
    if checkdate == True and entry[0:8] != date:
        continue
    if re.search(item, entry):
        # print(entry)
        name = re.search("(?:\: (.*) \(\#)", entry)
        name = name.group()
        name = name[2:-3]
        # print(name)
        if re.search("took", entry):
            if len(parsedlogtakes) == 0:
                parsedlogtakes = {name: 1}
                # print(parsedlogtakes[name])
            elif name in parsedlogtakes.keys():
                entries = parsedlogtakes[name]
                entries+=1
                parsedlogtakes.update({name: entries})
                # print(name + " took " + str(parsedlogtakes[name]))
            else:
                parsedlogtakes.update({name: 1})
        if re.search("added", entry):
            if len(parsedlogadds) == 0:
                parsedlogadds = {name: 1}
                # print(parsedlogadds[name])
            elif name in parsedlogadds.keys():
                entries = parsedlogadds[name]
                entries+=1
                parsedlogadds.update({name: entries})
                # print(name + " added " + str(parsedlogadds[name]))
            else:
                parsedlogadds.update({name: 1})

for player in parsedlogtakes.keys():
    print(player + " took " + str(parsedlogtakes[player]) + " and added " + str(parsedlogadds[player]))
    if parsedlogtakes[player] > parsedlogadds[player]:
        print("WARNING: " + player + " took more " + item + "s than they returned")
