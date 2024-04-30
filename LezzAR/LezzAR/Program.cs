using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        }
    );
});

LezzAR.Classes.Email.email = builder.Configuration.GetSection("SMTP")["SenderMail"];
LezzAR.Classes.Email.pwd = builder.Configuration.GetSection("SMTP")["SenderPassword"];
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<LezzAR.Models.ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));


builder.Services.AddRazorPages();
builder.Services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseForwardedHeaders();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapRazorPages();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Web API rotalarý
    endpoints.MapDefaultControllerRoute(); // MVC rotalarý
});


app.Run();
