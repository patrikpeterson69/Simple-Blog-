using SimpleBlog.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors();

// In-memory store
var posts = new List<Post>();
var nextId = 1;

string Slugify(string title) =>
    System.Text.RegularExpressions.Regex.Replace(title.ToLower().Trim(), @"[^a-z0-9]+", "-").Trim('-');

// GET /api/posts
app.MapGet("/api/posts", () => posts.OrderByDescending(p => p.PublishedAt).ToList());

// GET /api/posts/{slug}
app.MapGet("/api/posts/{slug}", (string slug) =>
{
    var post = posts.FirstOrDefault(p => p.Slug == slug);
    return post is null ? Results.NotFound() : Results.Ok(post);
});

// POST /api/posts
app.MapPost("/api/posts", (CreatePostDto dto) =>
{
    var post = new Post
    {
        Id = nextId++,
        Title = dto.Title,
        Slug = Slugify(dto.Title),
        Content = dto.Content,
        Excerpt = dto.Excerpt,
        IsPublished = dto.IsPublished,
        PublishedAt = DateTime.UtcNow,
    };
    posts.Add(post);
    return Results.Created($"/api/posts/{post.Slug}", post);
});

// PUT /api/posts/{id}
app.MapPut("/api/posts/{id:int}", (int id, UpdatePostDto dto) =>
{
    var post = posts.FirstOrDefault(p => p.Id == id);
    if (post is null) return Results.NotFound();

    post.Title = dto.Title;
    post.Slug = Slugify(dto.Title);
    post.Content = dto.Content;
    post.Excerpt = dto.Excerpt;
    post.IsPublished = dto.IsPublished;

    return Results.Ok(post);
});

// DELETE /api/posts/{id}
app.MapDelete("/api/posts/{id:int}", (int id) =>
{
    var post = posts.FirstOrDefault(p => p.Id == id);
    if (post is null) return Results.NotFound();
    posts.Remove(post);
    return Results.NoContent();
});

app.Run();
