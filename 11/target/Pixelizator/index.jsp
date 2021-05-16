<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pixelizator</title>
    <script src="js/script.js"></script>
    <link rel="stylesheet" href="css/style.css" type="text/css">
</head>
<body>
<div>
    <h1>Pixelizator</h1>
    <h2>Upload image</h2>
</div>
<div class="two">
    <input type="file" id = "file" accept="image/png, image/jpg, image/bmp, image/jpeg" onchange="upload_file()">
    <br>
    <img id="img" class="img" src="#" alt="preview image">

</p>

    <button onclick="pixelate()" id = "pix" disabled>Pixelate</button>
    </p>
    <input type="range" id = "range" name = "range" value="1" min="1" max="100" disabled onchange="number.value = this.value">
</p>
    <input  id="number" type="number" min="1" max = "100" value="1" disabled onchange="this.value >= 1 && this.value <= 100 ?
                                                                              range.value = this.value : null">
</p>
    <p id="name"> </p>
    <p id="size"> </p>

    <button name="download" onclick="download_image('png')" disabled>png</button>
    <button name="download" onclick="download_image('jpeg')" disabled>jpeg</button>
    <button name="download" onclick="download_image('jpg')" disabled>jpg</button>
    <button name="download" onclick="download_image('bmp')" disabled>bmp</button>
</div>
</body>
</html>