# Run this from inside C:\ThoughtShare (or wherever you downloaded all the files).
# It creates the proper Next.js folder structure and moves each file into place.

New-Item -ItemType Directory -Force -Path "app\login","app\signup","app\feed","app\profile\[username]" | Out-Null
New-Item -ItemType Directory -Force -Path "app\api\auth\signup","app\api\auth\login","app\api\auth\logout","app\api\auth\me" | Out-Null
New-Item -ItemType Directory -Force -Path "app\api\posts\[id]\comment","app\api\posts\[id]\like","app\api\posts\[id]\repost" | Out-Null
New-Item -ItemType Directory -Force -Path "app\api\users\[username]\follow" | Out-Null
New-Item -ItemType Directory -Force -Path "app\api\gif\search" | Out-Null
New-Item -ItemType Directory -Force -Path "lib","models","components" | Out-Null

function MoveIfExists($src, $dst) {
  if (Test-Path $src) { Move-Item -Force $src $dst }
}

MoveIfExists "gitignore.txt" ".gitignore"
MoveIfExists "env.local.example.txt" ".env.local.example"

MoveIfExists "lib_mongodb.js" "lib\mongodb.js"
MoveIfExists "lib__mongodb.js" "lib\mongodb.js"
MoveIfExists "lib_auth.js" "lib\auth.js"
MoveIfExists "lib__auth.js" "lib\auth.js"

MoveIfExists "models_User.js" "models\User.js"
MoveIfExists "models__User.js" "models\User.js"
MoveIfExists "models_Post.js" "models\Post.js"
MoveIfExists "models__Post.js" "models\Post.js"

MoveIfExists "app_layout.js" "app\layout.js"
MoveIfExists "app__layout.js" "app\layout.js"
MoveIfExists "app_globals.css" "app\globals.css"
MoveIfExists "app__globals.css" "app\globals.css"
MoveIfExists "app_page.js" "app\page.js"
MoveIfExists "app__page.js" "app\page.js"
MoveIfExists "app_login_page.js" "app\login\page.js"
MoveIfExists "app__login__page.js" "app\login\page.js"
MoveIfExists "app_signup_page.js" "app\signup\page.js"
MoveIfExists "app__signup__page.js" "app\signup\page.js"
MoveIfExists "app_feed_page.js" "app\feed\page.js"
MoveIfExists "app__feed__page.js" "app\feed\page.js"
MoveIfExists "app_profile_username_page.js" "app\profile\[username]\page.js"
MoveIfExists "app__profile__username__page.js" "app\profile\[username]\page.js"

MoveIfExists "app_api_auth_signup_route.js" "app\api\auth\signup\route.js"
MoveIfExists "app__api__auth__signup__route.js" "app\api\auth\signup\route.js"
MoveIfExists "app_api_auth_login_route.js" "app\api\auth\login\route.js"
MoveIfExists "app__api__auth__login__route.js" "app\api\auth\login\route.js"
MoveIfExists "app_api_auth_logout_route.js" "app\api\auth\logout\route.js"
MoveIfExists "app__api__auth__logout__route.js" "app\api\auth\logout\route.js"
MoveIfExists "app_api_auth_me_route.js" "app\api\auth\me\route.js"
MoveIfExists "app__api__auth__me__route.js" "app\api\auth\me\route.js"

MoveIfExists "app_api_posts_route.js" "app\api\posts\route.js"
MoveIfExists "app__api__posts__route.js" "app\api\posts\route.js"
MoveIfExists "app_api_posts_id_route.js" "app\api\posts\[id]\route.js"
MoveIfExists "app__api__posts__id__route.js" "app\api\posts\[id]\route.js"
MoveIfExists "app_api_posts_id_like_route.js" "app\api\posts\[id]\like\route.js"
MoveIfExists "app__api__posts__id__like__route.js" "app\api\posts\[id]\like\route.js"
MoveIfExists "app_api_posts_id_comment_route.js" "app\api\posts\[id]\comment\route.js"
MoveIfExists "app__api__posts__id__comment__route.js" "app\api\posts\[id]\comment\route.js"
MoveIfExists "app_api_posts_id_repost_route.js" "app\api\posts\[id]\repost\route.js"
MoveIfExists "app__api__posts__id__repost__route.js" "app\api\posts\[id]\repost\route.js"

MoveIfExists "app_api_users_username_route.js" "app\api\users\[username]\route.js"
MoveIfExists "app__api__users__username__route.js" "app\api\users\[username]\route.js"
MoveIfExists "app_api_users_username_follow_route.js" "app\api\users\[username]\follow\route.js"
MoveIfExists "app__api__users__username__follow__route.js" "app\api\users\[username]\follow\route.js"

MoveIfExists "app_api_gif_search_route.js" "app\api\gif\search\route.js"
MoveIfExists "app__api__gif__search__route.js" "app\api\gif\search\route.js"

MoveIfExists "components_Navbar.js" "components\Navbar.js"
MoveIfExists "components__Navbar.js" "components\Navbar.js"
MoveIfExists "components_PostCard.js" "components\PostCard.js"
MoveIfExists "components__PostCard.js" "components\PostCard.js"
MoveIfExists "components_PostComposer.js" "components\PostComposer.js"
MoveIfExists "components__PostComposer.js" "components\PostComposer.js"
MoveIfExists "components_StickerPicker.js" "components\StickerPicker.js"
MoveIfExists "components__StickerPicker.js" "components\StickerPicker.js"
MoveIfExists "components_GifPicker.js" "components\GifPicker.js"
MoveIfExists "components__GifPicker.js" "components\GifPicker.js"

Write-Host "Done! Here's the resulting structure:"
Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch "node_modules" } | ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "") }
