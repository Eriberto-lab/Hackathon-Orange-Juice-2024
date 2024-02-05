-- app_database.users definition


CREATE TABLE "users" (
"id" varchar(36) NOT NULL,
"name" varchar(100) NOT NULL,
"lastName" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
"iconUrl" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
"email" varchar(100) NOT NULL,
"country" varchar(100) DEFAULT NULL,
"password" varchar(100) NOT NULL,
"createdAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
"isGoogleLogin" boolean NOT NULL DEFAULT 0,
PRIMARY KEY ("id"),
UNIQUE KEY "email" ("email")
)


-- app_database.projects definition


CREATE TABLE `projects` (
`id` varchar(36) NOT NULL,
`title` varchar(100) NOT NULL,
`tags` varchar(255) NOT NULL,
`link` varchar(255) NOT NULL,
`description` text NOT NULL,
`imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
`idUser` varchar(36) NOT NULL,
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
KEY `fk_user_project` (`idUser`),
CONSTRAINT `fk_user_project` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;