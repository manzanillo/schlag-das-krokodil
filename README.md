# Schlag das Krokodil

Computer, die Schach spielen und Menschen schlagen können, kennen wir mittlerweile. Das chinesische Brettspiel Go hingegen
galt lange Zeit als so komplex, dass nur Menschen es meistern können – so lange, bis Google mit AlphaGo menschliche ProfiSpielerinnen und Spieler das Fürchten lehrte. In dieser Aktivität sehen wir, wie Computer selbst Strategien für Spiele lernen, obwohl sie nur die Spielregeln kennen.

Diese Aktivität basiert auf einer Idee von [CS4Fun](http://www.cs4fn.org/machinelearning/sweetlearningcomputer.php).
Die Unplugged-Version der Aktivität finden Sie [hier](https://ddi.cs.fau.de/schule/ai-unplugged/).

Das Applet kann unter https://www.stefanseegerer.de/schlag-das-krokodil/ ausprobiert werden.
Es werden zwei Query-Parameter unterstützt.
Mittels time=500 kann die Reaktionszeit des Computers auf eine beliebige MS-Zahl gestellt werden. (Beispiel: https://www.stefanseegerer.de/schlag-das-krokodil/?time=500)
Mithilfe von halloween=true kann der Halloween-Modus aktiviert werden. (Beispiel: https://www.stefanseegerer.de/schlag-das-krokodil/?halloween=true)



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Deployment to Github Pages
To deploy the application to Github Pages use the following two commands.
```
yarn build
yarn deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
