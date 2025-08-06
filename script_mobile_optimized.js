document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.option-button');
    const resultsContainer = document.getElementById('results-container');
    const chartCanvas = document.getElementById('pollChart');
    const legendContainer = document.querySelector('.legend-container');

    let myChart = null;

    const pollData = {
        labels: ['Bugün Yarın', 'Bu Hafta', 'Bu Ay', 'Allah Büyük'],
        votes: {
            'Bugün Yarın': 0,
            'Bu Hafta': 0,
            'Bu Ay': 0,
            'Allah Büyük': 0
        },
        backgroundColors: [
            'rgba(52, 152, 219, 0.8)',
            'rgba(46, 204, 113, 0.8)',
            'rgba(231, 76, 60, 0.8)',
            'rgba(241, 196, 15, 0.8)'
        ]
    };

    let selectedOption = null;

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (selectedOption) {
                pollData.votes[selectedOption]--;
                const prevSelectedButton = document.querySelector('.option-button.selected');
                if (prevSelectedButton) {
                    prevSelectedButton.classList.remove('selected');
                }
            }

            const newSelectedOption = button.textContent;
            pollData.votes[newSelectedOption]++;
            selectedOption = newSelectedOption;

            button.classList.add('selected');
            renderChart();
        });
    });

    function renderChart() {
        if (myChart) {
            myChart.destroy();
        }

        legendContainer.innerHTML = '';
        pollData.labels.forEach((label, index) => {
            const legendItem = document.createElement('div');
            legendItem.classList.add('legend-item');

            const colorBox = document.createElement('div');
            colorBox.classList.add('legend-color-box');
            colorBox.style.backgroundColor = pollData.backgroundColors[index];

            const text = document.createElement('span');
            text.textContent = label;

            legendItem.appendChild(colorBox);
            legendItem.appendChild(text);
            legendContainer.appendChild(legendItem);
        });

        myChart = new Chart(chartCanvas, {
            type: 'pie',
            data: {
                labels: pollData.labels,
                datasets: [{
                    data: Object.values(pollData.votes),
                    backgroundColor: pollData.backgroundColors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    }

    renderChart();
});