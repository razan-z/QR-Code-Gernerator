document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('QREnter');
    const downloadBtn = document.getElementById('DownloadQRBtn');
    const urlInput = document.getElementById('URL');
    const qrDisplay = document.getElementById('QRDisplay');
    const resultBox = document.querySelector('.box.hidden');

    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    async function generateQRCode() {
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a URL');
            return;
        }

        try {

            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating...';


            const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url)}`;


            const img = document.createElement('img');
            img.src = apiUrl;
            img.alt = 'QR Code';
            img.id = 'qrImage';
            img.className = 'qr-code-image';

            img.onload = function () {
                img.style.opacity = '1';
            };


            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';


            qrDisplay.innerHTML = '';
            qrDisplay.appendChild(img);

            resultBox.classList.remove('hidden');

        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('Failed to generate QR code. Please try again.');
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate';
        }
    }

    function downloadQRCode() {
        const qrImage = document.getElementById('qrImage');
        if (!qrImage) {
            alert('No QR code to download');
            return;
        }

        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    urlInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
});