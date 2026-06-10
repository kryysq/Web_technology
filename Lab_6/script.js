const days = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Нд"
];

function generateWeather() {
    const maxTemp = [];
    const minTemp = [];
    const rain = [];

    for (let i = 0; i < 7; i++) {

        const min = Math.floor(Math.random() * 8) + 12;
        const max = min + Math.floor(Math.random() * 8) + 5;

        minTemp.push(min);
        maxTemp.push(max);

        rain.push(Math.floor(Math.random() * 25));
    }

    return {
        maxTemp,
        minTemp,
        rain
    };
}

let weather = generateWeather();

const ctx = document
    .getElementById("weatherChart")
    .getContext("2d");

const chart = new Chart(ctx, {
    data: {
        labels: days,
        datasets: [
            {
                type: "line",
                label: "Макс. температура °C",
                data: weather.maxTemp,
                tension: 0.3
            },
            {
                type: "line",
                label: "Мін. температура °C",
                data: weather.minTemp,
                tension: 0.3
            },
            {
                type: "bar",
                label: "Опади (мм)",
                data: weather.rain
            }
        ]
    },

    options: {
        responsive: true,

        interaction: {
            mode: "index",
            intersect: false
        },

        plugins: {
            tooltip: {
                callbacks: {
                    afterBody: function(context) {

                        const index = context[0].dataIndex;

                        return [
                            `Макс: ${weather.maxTemp[index]}°C`,
                            `Мін: ${weather.minTemp[index]}°C`,
                            `Опади: ${weather.rain[index]} мм`
                        ];
                    }
                }
            }
        },

        onHover: (event, elements) => {

            if (elements.length > 0) {

                const index = elements[0].index;

                document.getElementById("info").textContent =
                    `${days[index]} | Макс: ${weather.maxTemp[index]}°C | Мін: ${weather.minTemp[index]}°C | Опади: ${weather.rain[index]} мм`;

                console.log(
                    days[index],
                    weather.maxTemp[index],
                    weather.minTemp[index],
                    weather.rain[index]
                );
            }
        }
    }
});

document
    .getElementById("generateBtn")
    .addEventListener("click", () => {

        weather = generateWeather();

        chart.data.datasets[0].data = weather.maxTemp;
        chart.data.datasets[1].data = weather.minTemp;
        chart.data.datasets[2].data = weather.rain;

        chart.update();

        document.getElementById("info").textContent =
            "Новий прогноз успішно згенеровано!";
    });