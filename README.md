# C-term3D_Website

A website implementation of my C program [C-term3D](https://github.com/ashleythatcatgirl/C-term3D)

# Description

## Overview

This website is (going to be) an implementation of my C rendering program for 3D scenes and models, with the api from [Poly Haven](https://polyhaven.com) for downloading the models, and viewing them in your browser

## Details

Currently has a feature for listing through all availible items (models, textures, hdri's) from the api, searching, filtering by type and category, a local storage for favorited items, and a session storage for downloaded items


### Frontend

Made with react (javascript), and Tailwind for css since im not a graphics designer and I can't be trusted with designing my own css
The main part is a viewport of the C program with basic controls for camera and such (not yet implemented)

### Backend

#### Api (Poly Haven)
- Search field and filtering based on metadata
- Saving favorite models
- Downloading models (not implemented kinda)


