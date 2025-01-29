//list faq
const faqData = [
    {
        question: 'Apa itu HTML (HyperText Markup Language)?',
        answer: 'HTML adalah bahasa markup yang digunakan untuk membuat struktur dasar sebuah halaman web. HTML memungkinkan Anda untuk menentukan elemen seperti teks, gambar, tautan, tabel, dan banyak lagi. Membuat kerangka (struktur) halaman web.'
    },
    {
        question: 'Apa itu  CSS (Cascading Style Sheets)?',
        answer: 'CSS adalah bahasa desain yang digunakan untuk mengatur tata letak dan gaya (desain visual) elemen HTML, seperti warna, ukuran, margin, padding, dan lain-lain. Mengatur tampilan halaman web agar lebih menarik.'
    },
    {
        question: 'Apa itu JAVASCRIPT?',
        answer: 'JavaScript adalah bahasa pemrograman yang digunakan untuk menambahkan interaktivitas dan fungsionalitas ke halaman web. Dengan JavaScript, halaman web bisa menjadi dinamis, misalnya dengan menambahkan animasi, form validasi, atau respons terhadap klik pengguna.Menghidupkan halaman web dengan fitur interaktif.'
    }
];

//get accordion container
const accordionContainer = document.getElementById('accordion');

//function to generate accordion items
function generateAccordionItems(faqData){
    faqData.forEach(item => {
        const accordionItems = document.createElement('div')
        accordionItems.classList.add('accordion-item')
        //creat element for header
        const header = document.createElement('button')
        header.classList.add('accordion-header')
        header.textContent = item.question
        //create element for content
        const content = document.createElement('div')
        content.classList.add('accordion-content')

        const contentText = document.createElement('p')
        contentText.textContent = item.answer

        //insert element to HTML
        content.appendChild(contentText)
        accordionItems.appendChild(header)
        accordionItems.appendChild(content)

        //add accordion item to accordion container
        accordionContainer.appendChild(accordionItems)
    })
};

//call function generate faq
generateAccordionItems(faqData)


//get element accordion header
const accordionHeaders = document.querySelectorAll('.accordion-header')

//add event listener
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active')
        const accordionContent = header.nextElementSibling

        if(header.classList.contains('active')){
            accordionContent.style.maxHeight =
            accordionContent.scrollHeight + 'px'
        }else{
            accordionContent.style.maxHeight = 0
        }

        accordionHeaders.forEach(otherHeader => {
            if(otherHeader !== header && otherHeader.classList.contains('active')){
                otherHeader.classList.remove('active')
                otherHeader.nextElementSibling.style.maxHeight = 0
            }
        })
    });
})