FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY SimpleBlog.Api/SimpleBlog.Api.csproj SimpleBlog.Api/
RUN dotnet restore SimpleBlog.Api/SimpleBlog.Api.csproj
COPY . .
RUN dotnet publish SimpleBlog.Api/SimpleBlog.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "SimpleBlog.Api.dll"]
