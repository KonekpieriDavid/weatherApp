interface WeatherData {
    main: {
        temp: number;
        humidity: number;
        pressure: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
        deg: number;
    }
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    }
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    name: string;
    visibility: number;
}

export default WeatherData;