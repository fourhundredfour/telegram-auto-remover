# telegram-auto-remover
Removes an user selected by the username

## Index

## Requirements
* Docker

## Installation
1. Fill every word or letter which should be filtered.
2. Build the image `$ docker build . -t telegram-auto-remover`
3. Run the container with `$ docker run --rm -d -e TOKEN=<token> -e CHAT_ID=<chat id> telegram-auto-remover`