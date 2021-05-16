let file;
let format;

async function upload_file() {
    try {
        file = document.getElementById('file').files[0];
        switchButtons(false);
        if (validateFormat()) {
            document.getElementById('img').src = "https://i.ibb.co/Bz8vYYF/1-9-EBHIOzh-E1-Xf-MYo-Kz1-Jcs-Q.gif";
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch(document.location.origin + '/Pixelizator_war_exploded/corrupted', { //локальный адрес + ссылка на сервлет
                method: 'POST',
                body: formData
            });
            const result = response.status;
            if (result === 200) {
                switchButtons(true);
                document.getElementById('img').src = URL.createObjectURL(file);
                document.getElementById('name').textContent = 'Name: ' + file.name.split('.')[0];
                document.getElementById('size').textContent = 'Size: ' + toBytes(file.size);
            } else {
                document.getElementById('img').src = "https://i.postimg.cc/sxBQw6f9/image.png";
            }
        } else {
            document.getElementById('img').src = "https://i.ibb.co/3dMCNQN/image-1.png";
        }
    } catch (error) {
        file = null;
        document.getElementById('img').src = "#";
        document.getElementById('name').textContent = ' ';
        document.getElementById('size').textContent = ' ';
    }
}


async function pixelate() {
    try{
        const formData = new FormData();
        formData.append("file", file);

        document.getElementById('file').setAttribute("disabled", "disabled");
        switchButtons(false);
        document.getElementById('img').src = "https://i.ibb.co/Bz8vYYF/1-9-EBHIOzh-E1-Xf-MYo-Kz1-Jcs-Q.gif";

        const response = await fetch(document.location.origin + '/Pixelizator_war_exploded/pixelize',{
            method: 'POST',
            body: formData,
            headers: {
                'format': file.name.split('.').pop(),
                'range': document.getElementById('range').value
            }
        });
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = function() { document.getElementById('img').src = reader.result; }
        reader.readAsDataURL(blob);
        switchButtons(true);
        document.getElementById('size').textContent = "Size: " + toBytes(blob.size);
        document.getElementById('file').removeAttribute("disabled");
    } catch (error) {
        console.log(error);
    }
}

function validateFormat() {
    format = file.name.split(".").pop();
    return format === "jpeg" || format === "jpg" || format === "png" || format === "bmp";

}

function switchButtons(flag) {
    if (flag) {
        document.getElementById('range').removeAttribute("disabled");
        document.getElementById('number').removeAttribute("disabled");
        document.getElementById('pix').removeAttribute("disabled");
        document.getElementsByName('download').item(0).removeAttribute("disabled");
        document.getElementsByName('download').item(1).removeAttribute("disabled");
        document.getElementsByName('download').item(2).removeAttribute("disabled");
        document.getElementsByName('download').item(3).removeAttribute("disabled");
    } else {
        document.getElementById('range').setAttribute("disabled", "disabled");
        document.getElementById('number').setAttribute("disabled", "disabled");
        document.getElementById('pix').setAttribute("disabled", "disabled");
        document.getElementsByName('download').item(0).setAttribute("disabled", "disabled");
        document.getElementsByName('download').item(1).setAttribute("disabled", "disabled");
        document.getElementsByName('download').item(2).setAttribute("disabled", "disabled");
        document.getElementsByName('download').item(3).setAttribute("disabled", "disabled");
    }
}

function toBytes(x) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;

    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

async function download_image(form) {
    const link = document.createElement('a')
    link.setAttribute('href', document.getElementById('img').src);
    link.setAttribute('download', 'pixelated.' +  form)
    link.click()
    link.remove();
}


