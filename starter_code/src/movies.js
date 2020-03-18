/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes

const turnHoursToMinutes = (moviesArray) =>
{
      let newMoviesArray = moviesArray.map
      (
          function(movie)
          {
              let newMovie = {};
              newMovie.title = movie.title;newMovie.year = movie.year;
              newMovie.director = movie.director;
              newMovie.duration = calculateMinutes(movie.duration);
              newMovie.genre = movie.genre;
              newMovie.rate = movie.rate;
              return newMovie;
          }
      )
      return newMoviesArray;
};

const calculateMinutes = (duration) =>
{

    if (duration === undefined)
    {
        return 0;
    }
    else
    {
        console.log("es aquest: " + duration);
        let totalMinutes = 0;
        if(duration.includes(' '))
        {
            console.log("si inclou");let n = duration.split(' ');
            let hoursInMinutes = getHours(n[0]);
            let minutesinMinutes = getMinutes(n[1]);
            totalMinutes = hoursInMinutes + minutesinMinutes;
            return totalMinutes;
        }
        else
        if(duration.includes('h'))
        {
            let n = duration.split('h');
            console.log("Estic aqui: " + n[0]);
            let hours = getHours(n[0]);
            return hours;
        }
        else
        if(duration.includes('min'))
        {
            let n = duration.split('min');
            console.log("Estic aqui: " + n[0]);
            let minutes = Number(n[0]);
            return minutes;
        }
    }
    return 0;
};

const getHours = (hours) =>
{
    console.log("getHours: " + hours);
    if (hours !== undefined)
    {
        let nhours = hours.split('h');
        console.log(nhours);
        let minutes = Number(nhours[0]);
        minutes = minutes*60;
        console.log("hores en minuts: " + minutes);
        return minutes;
    }
    else
    {
        console.log("its undefined");
        return 0;
    }
};

const getMinutes = (minutes) =>
{
    console.log("getMinutes: " + minutes);
    if (minutes !== undefined)
    {
        let nminutes = minutes.split('min');
        console.log(nminutes);
        minutes = Number(nminutes[0]);
        console.log("minuts en minuts: " + minutes);
        return minutes;
    }
    else
    {
        console.log("its undefined");return 0;
    }
};

let newMoviesArray = turnHoursToMinutes(movies);
// console.log(movies);
console.log(newMoviesArray);

/* ////////////////////////////// ////////////////////////////// ////////////////////////////// ////////////////////////////// //////////////////////////////  */

// Get the average of all rates with 2 decimals 


const ratesAverage = (movies) =>
{
    let total = movies.reduce
    (
        function( sum, movie)
        {
            let n = sum + Number(movie.rate);
            return n;
        },0
    );
    
    let rateAverage = total/ movies.length;
    let n = Math.round(rateAverage*100)/100;
    return Number(n);
};


/* ////////////////////////////// ////////////////////////////// ////////////////////////////// ////////////////////////////// //////////////////////////////  */

// Get the average of Drama Movies

const dramasOnly = (movies) =>
{
    let dramas = movies.filter
    (
        function(movie)
        {
            let newMovie = movie.genre.includes("Drama");
            return newMovie;
        }
    )
    return dramas;
}

const dramaMoviesRate = (movies) =>
{

    let dramas = dramasOnly(movies);
    if (dramas.length===0)
    {
        return undefined;
    }
    else
    {
        let media = ratesAverage(dramas);
        return media;
    }
};


/* ////////////////////////////// ////////////////////////////// ////////////////////////////// ////////////////////////////// //////////////////////////////  */


// Order by time duration, in growing order

const orderByDuration = (movies) =>
{
  let sortedArray = movies.sort
  (
    (moviesA, moviesB) =>
    {
      let result = moviesA.duration - moviesB.duration;
      
      if(result !== 0)
      {
        return result;
      }
      
      if (moviesA.title > moviesB.title)
      {
        return 1;
      }
      
      if (moviesA.title < moviesB.title)
      {
        return -1;
      }
      return 0;
    }
  )
  return sortedArray;
}

/* ////////////////////////////// ////////////////////////////// ////////////////////////////// ////////////////////////////// //////////////////////////////  */

// How many movies did STEVEN SPIELBERG

const howManyMovies = (movies) =>
{
    if(movies.length === 0)
    {
        return;
    }

    let dramas = dramasOnly(movies);
  
  let dramasSteven = dramas.filter
  (
    function(movie)
    {
      let newMovie = movie.director.includes("Steven Spielberg");
      return newMovie;
    }
  )
  let n = dramasSteven.length;
  let stn = `Steven Spielberg directed ${n} drama movies!`;
  return stn;
}

/* ////////////////////////////// ////////////////////////////// ////////////////////////////// ////////////////////////////// //////////////////////////////  */

// Order by title and print the first 20 titles

const orderAlphabetically = (movies) =>
{
    if(movies.length === 0)
    {
        return movies;
    }

    let orderedMovies = movies.map
    (
        function(movie)
        {
            let newTitle = movie.title;
            return newTitle;
        }
    );
    orderedMovies = orderedMovies.sort();
    orderedMovies = orderedMovies.slice( 0, 20);
    return orderedMovies;
}

/* ////////////////////////////// ////////////////////////////// ////////////////////////////// ////////////////////////////// //////////////////////////////  */

// Best yearly rate average
const bestYearAvg = (movies) =>
{
  if(movies.length===0){return undefined;}

  let moviesDataset = [];
  
  movies.forEach( function(movie)
  {
    let nYear = parseInt(movie.year);
    console.log("movie: " + nYear);

    let index = moviesDataset.findIndex( movie => movie.year===nYear);
    console.log("nou index:" + index);

    if (index===-1)
    {
      let newEntry = { year: parseInt(movie.year), moviesCount: 1, totalRating: parseFloat(movie.rate), };
      moviesDataset.push(newEntry);
    }
    else
    {
      moviesDataset[index].moviesCount = moviesDataset[index].moviesCount + 1;
      let nRate = parseFloat(movie.rate);
      nRate = Math.round(nRate*100)/100;
      console.log(`nRate: ${nRate.toFixed(2)}`);
      moviesDataset[index].totalRating = moviesDataset[index].totalRating + nRate;
    }
  });

  for (let i in moviesDataset)
  {
    let mc = moviesDataset[i].moviesCount;
    let toar = moviesDataset[i].totalRating;
    let average = (toar/mc);
    average = Number(average.toFixed(2));
    console.log(`Mitja es: ${average}`);
    moviesDataset[i].mitjaTotal = average;
  }

  let maxim = Math.max.apply(Math, moviesDataset.map(function(m) { return m.mitjaTotal; }))

  let bestYears =  moviesDataset.filter(function(e) {
    return e.mitjaTotal === maxim;
  });

  console.log(bestYears);

  let oldYear = Math.min.apply(Math, bestYears.map( function(elem) {return elem.year}));
  

  console.log(`any maxim: ${oldYear}`);


  
  let movieSelected = bestYears.findIndex( e => e.year===oldYear);
  console.log(`movie selected: ${movieSelected}`);
  let element = bestYears[movieSelected];

  console.log(element);

  let millorAny = bestYears[movieSelected].year;
  let millorRati = bestYears[movieSelected].mitjaTotal;

  let comentari = `The best year was ${millorAny} with an average rate of ${millorRati}`;

  console.log(comentari);

  return comentari;

  
}





