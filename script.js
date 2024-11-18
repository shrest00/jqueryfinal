const playlists = {
  rock: [
    { title: "Livin' On A Prayer", artist: "Bon Jovi", mp3: "music/Bon.mp3", cover: "images/jon.png" },
    { title: "We Will Rock You", artist: "Queen", mp3: "music/Queen.mp3", cover: "images/fred.png" }
  ],
  pop: [
    { title: "Espresso", artist: "Sabrina Carpenter", mp3: "music/EXPRESSO.mp3", cover: "images/Sabrina.png" },
    { title: "Birds of a Feather", artist: "Billie Eilish", mp3: "music/Billie.mp3", cover: "images/billie.png" }
  ],
  jazz: [
    { title: "L'Amour, Les Baguettes, Paris", artist: "Stella Jang", mp3: "music/Lamour.mp3", cover: "images/stella.png" },
    { title: "C'est Si Bon", artist: "Aoi Teshima", mp3: "music/Cestsibon.mp3", cover: "images/aoi.png" }
  ]
};

// Handle genre selection
$('.genre-button').on('click', function () {
  const genre = $(this).data('genre');
  const playlist = playlists[genre];

  // Update playlist dynamically
  const $playlist = $('#playlist ul');
  const $songNames = $('#song-names');
  $playlist.html(''); // Clear existing playlist
  $songNames.html(''); // Clear previous song names

  playlist.forEach((song) => {
    // Append song names to the top
    $songNames.append(`<p>${song.title}</p>`);

    // Append song item to the list
    const listItem = `
      <li data-mp3="${song.mp3}" data-cover="${song.cover}" data-artist="${song.artist}">
        <img src="${song.cover}" alt="${song.title} Cover">
        <p>${song.title}</p>
      </li>`;
    $playlist.append(listItem);
  });

  // Highlight active genre button
  $('.genre-button').removeClass('active');
  $(this).addClass('active');
});

// Handle song selection and play
$('#playlist').on('click', 'li', function () {
  const songUrl = $(this).data('mp3');  // Use 'data-mp3' instead of 'data-url'
  const songCover = $(this).data('cover');
  const artistName = $(this).data('artist');
  const $audio = $('#audio-player');
  const $albumCover = $('#album-cover');
  const $artistName = $('#artist-name');
  const $songTitle = $('#song-title');

  // Set audio source and play
  $audio.attr('src', songUrl);
  $audio.get(0).play();

  // Display album cover
  $albumCover.html(`<img src="${songCover}" alt="Album Cover" />`);

  // Display artist name and song title
  $artistName.text(`Artist: ${artistName}`);
  $songTitle.text(`Song: ${$(this).find('p').text()}`);
});

// Handle play/pause functionality
$('#play-button').on('click', function () {
  const $audio = $('#audio-player');
  $audio.get(0).play();
});

$('#pause-button').on('click', function () {
  const $audio = $('#audio-player');
  $audio.get(0).pause();
});

// Handle next button functionality
$('#next-button').on('click', function () {
  const $playlist = $('#playlist ul');
  const $audio = $('#audio-player');
  const $albumCover = $('#album-cover');
  const $artistName = $('#artist-name');
  const $songTitle = $('#song-title');
  
  // Get the currently playing song item
  const currentSongIndex = $playlist.find('li').index($playlist.find('li').filter(function () {
    return $(this).find('p').text() === $songTitle.text().replace('Song: ', '');
  }));
  
  const nextSongIndex = (currentSongIndex + 1) % $playlist.find('li').length; // Loop back to the first song if at the end

  const nextSong = $playlist.find('li').eq(nextSongIndex);
  const songUrl = nextSong.data('mp3');
  const songCover = nextSong.data('cover');
  const artistNameText = nextSong.data('artist');
  
  // Update the audio player to the next song
  $audio.attr('src', songUrl);
  $audio.get(0).play();
  
  // Update album cover and song info
  $albumCover.html(`<img src="${songCover}" alt="Album Cover" />`);
  $artistName.text(`Artist: ${artistNameText}`);
  $songTitle.text(`Song: ${nextSong.find('p').text()}`);
});

