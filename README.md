# C-term3D_Website

A website implementation of my C program [C-term3D](https://github.com/ashleythatcatgirl/C-term3D)

# Description

## Overview

This website is (going to be) an implementation of my C rendering program for 3D scenes and models, with the api from [Poly Haven](https://polyhaven.com) for downloading the models, and viewing them in your browser
The main reason point, is for it to make 3D modeling more accesible
I will definitely be working on this for a while longer, since i wanna improve my C program and also definitely this website

## Details

The design is pretty simple, just a header, a viewport for the program with a list of imported models on the side, and under all that a search/filter grid of all the available models, textures, etc.
Currently has a feature for listing through all availible items (models, textures, hdri's) from the api, searching, filtering by type and category, a local storage for favorited items, and a session storage for downloaded items

## Bugs and issues (oh so many)

- For some reason (im pretty sure its a confusion between 0 and null), the 0th model cannot be favorited
- The loading takes too long and some api fetches are not necessary
- The code is a huge mess and i have to rewrite it
- A lot of things are still missing (for example the info page that i just forgot about)
- The design is booring, and extremely meh
- The program implementation is well.. non existant
- There are a few details missing for models in terms of info
- The page isnt exactly the most mobile friendly
- Others for sure

### Frontend

Made with react (javascript), and Tailwind for css since im not a graphics designer and I can't be trusted with designing my own css
The main part is a viewport of the C program with basic controls for camera and such (not yet implemented)

### Backend

#### Api (Poly Haven)
Search field and filtering based on metadata
Saving favorite models
Downloading models (not implemented kinda)


