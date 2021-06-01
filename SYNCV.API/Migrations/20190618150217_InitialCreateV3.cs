using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SYNCV.API.Migrations
{
    public partial class InitialCreateV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LogStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LogTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuthLogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UsedUser = table.Column<string>(nullable: true),
                    UserIP = table.Column<string>(nullable: true),
                    LogStatusId = table.Column<int>(nullable: false),
                    LogTypeId = table.Column<int>(nullable: false),
                    Details = table.Column<string>(nullable: true),
                    LogDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuthLogs_LogStatus_LogStatusId",
                        column: x => x.LogStatusId,
                        principalTable: "LogStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuthLogs_LogTypes_LogTypeId",
                        column: x => x.LogTypeId,
                        principalTable: "LogTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "blob", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "blob", nullable: true),
                    PersonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuthLogs_LogStatusId",
                table: "AuthLogs",
                column: "LogStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_AuthLogs_LogTypeId",
                table: "AuthLogs",
                column: "LogTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PersonId",
                table: "Users",
                column: "PersonId");

            migrationBuilder.Sql("INSERT INTO LogStatus (Description) VALUES ('SUCCESS')");
            migrationBuilder.Sql("INSERT INTO LogStatus (Description) VALUES ('FAILURE')");

            migrationBuilder.Sql("INSERT INTO LogTypes (Description) VALUES ('SUCCESSFULLY_ENTERED')");
            migrationBuilder.Sql("INSERT INTO LogTypes (Description) VALUES ('INVALID_MODEL')");
            migrationBuilder.Sql("INSERT INTO LogTypes (Description) VALUES ('INCORRECT_PASSWORD')");
            migrationBuilder.Sql("INSERT INTO LogTypes (Description) VALUES ('USER_NOT_EXISTS')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthLogs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "LogStatus");

            migrationBuilder.DropTable(
                name: "LogTypes");

            migrationBuilder.DropTable(
                name: "Persons");
        }
    }
}
