# Valueblue assigment


To install deps

## `npm i`

To start

## `npm start`

### Answers

#### Considering thet different users can work on the same diagram at the same time, design/describe a straregy to share changes on the diagram.

To acheve this we should have one source of truth on a server. With any change which a user make we should save that change on the server. At the same time we should constantly listen the server to get all changes and show them on the screen. We can use WebSocket or so to get/set diagram changes.

#### consodering the diagram model, and the fact that any change on the digram should be peristent, design/describe a strategy to save changes on the diagram.

We can set/get a Edit mark for a element which is under editing at the moment, that can reduce overwriting cases. So we should add `EditNow` structure for a diagram. Inside can be fields like - `ElementId, TimestampStart, UserId`, etc. For sure we should save all history of diagram changes.

ps: With multiusing it would be convenient to show information about who uses a diagram at the moment and which part with that users can work on different diagram's parts and do not disturb each other.

