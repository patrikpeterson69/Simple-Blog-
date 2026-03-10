namespace SimpleBlog.Api.Models;

public record CreatePostDto(string Title, string Content, string Excerpt, bool IsPublished);
public record UpdatePostDto(string Title, string Content, string Excerpt, bool IsPublished);
