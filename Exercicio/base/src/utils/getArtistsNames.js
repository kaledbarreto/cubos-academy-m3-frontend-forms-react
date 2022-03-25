export default function getArtistsNames(artists) {
  const artistsNames = artists.map(artists => artists.name);
  return artistsNames.join(', ');
}