const icons = import.meta.glob(
  "../assets/WeatherIcons/SVG/*.svg",
  {
    eager: true,
    import: "default"
  }
);

export const getIcon = (name) => {
  return icons[
    `../assets/WeatherIcons/SVG/${name}.svg`
  ];
};