document.getElementById('upload').addEventListener('change', handleImage);
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', applyFilter);
});
document.getElementById('download').addEventListener('click', downloadImage);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function applyFilter(e) {
    let filter = e.target.getAttribute('data-filter');
    ctx.filter = filter;
    ctx.drawImage(img, 0, 0);
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = canvas.toDataURL();
    link.click();
}
