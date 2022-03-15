const srch_butn = document.getElementById('button')
const city_name = document.getElementById('search');
const city_info = document.getElementById('city-name');
const temp = document.getElementById('card-text-1');
const sky_stat = document.getElementById('card-text-2');
console.log(sky_stat);

let temp_info = async(event) => {
    event.preventDefault();

    let city_val = city_name.value;



    if (city_val === '') {

        city_info.innerHTML = "Pls enter city name";

    } else {
        try {
            let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&appid=6897ef65d67a3d92cd204e54b0a90c6b`;
            const res = await fetch(api_url);
            const data = await res.json();
            const arrdata = [data];
            city_info.innerHTML = arrdata[0].name + "," + " " + arrdata[0].sys.country;
            let temp_k = arrdata[0].main.temp - 273;
            let temp_c = temp_k.toFixed(2);
            temp.innerHTML = temp_c + "<sup>o</sup>" + "C";
            let temp_stat = arrdata[0].weather[0].main;

            if (temp_stat == "Clear") {
                sky_stat.innerHTML = '<i class="fas fa-sun fa-5x"></i>';
            } else if (temp_stat == 'Clouds') {
                sky_stat.innerHTML = '<i class="fas fa-cloud fa-5x"></i>';
            } else if (temp_stat == "Rain") {
                sky_stat.innerHTML = '<i class="fas fa-cloud-showers-heavy fa-5x"></i>';
            } else if (temp_stat == "Haze") {
                sky_stat.innerHTML = '<i class="fas fa-cloud-sun fa-5x"></i>';
            } else if (temp_stat == "Mist") {
                sky_stat.innerHTML = '<i class="fas fa-smog fa-5x"></i>';
            }



        } catch (error) {
            city_info.innerHTML = "pls enter valid name";

        }


    }
}


srch_butn.addEventListener('click', temp_info);