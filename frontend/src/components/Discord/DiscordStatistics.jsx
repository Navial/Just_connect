import React, { useContext } from "react";
import * as d3 from "d3";
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"

const DiscordStatistics = ( ) => {
const {userGuilds} = useContext(DiscordUserContext);

const guilds = userGuilds;
  console.log(guilds);
  var data = [];
  guilds.forEach((guild) => {
    data.push({
      name: guild.name,
      featuresNumber: guild.features.length,
    });
  });

  const width = 800;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 150, left: 40 };

  const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.featuresNumber)]).range([height, 0]);
  const xScale = d3.scaleBand().domain(data.map((d) => d.name)).range([0, width]).padding(0.1);

  // Création de l'axe y
  const yAxis = d3.axisLeft(yScale);

  // Création de l'axe x
  const xAxis = d3.axisBottom(xScale);

  // Création du conteneur du graphique
  const svg = d3
    .select("#discord-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.name))
    .attr("y", (d) => yScale(d.featuresNumber))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.featuresNumber))
    .attr("fill", "#7289da");

  
  svg.append("g").call(yAxis);

  
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");


  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Nombre de fonctionnalités");

  return <div id="discord-chart"></div>;
};

export default DiscordStatistics;
