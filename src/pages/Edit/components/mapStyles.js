const mapStyles = [
	{
		featureType: "poi",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				hue: "#1900ff",
			},
			{
				color: "#c0e8e8",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#f5f5f5",
			},
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi.school",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				lightness: 100,
			},
			{
				visibility: "simplified",
			},
		],
	},
	{
		featureType: "road",
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "geometry",
		stylers: [
			{
				visibility: "on",
			},
			{
				lightness: 700,
			},
		],
	},
	{
		featureType: "water",
		elementType: "all",
		stylers: [
			{
				color: "#7dcdcd",
			},
		],
	},
];

export default mapStyles;
