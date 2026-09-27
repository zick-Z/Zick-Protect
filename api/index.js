export default function handler(req, res) {
    // 1. Ambil User-Agent dari request HTTP
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    
    // 2. Cek apakah pemanggilnya adalah Executor Roblox
    const isRobloxExecutor = 
        userAgent.includes('roblox') || 
        userAgent.includes('delta') || 
        userAgent.includes('fluxus') || 
        userAgent.includes('codex') || 
        userAgent.includes('solara') ||
        userAgent.includes('synapse') ||
        userAgent.includes('electron') ||
        req.headers['roblox-id'] !== undefined;

    if (isRobloxExecutor) {
        // =========================================================
        // A. DIPANGGIL DARI ROBLOX -> KIRIM SCRIPT LUA ASLI
        // =========================================================
        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).send(`
-- Memastikan game ter-load sempurna
if not game:IsLoaded() then
    game.Loaded:Wait()
end

local TweenService = game:GetService("TweenService")
local CoreGui = game:GetService("CoreGui")
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Workspace = game:GetService("Workspace")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local LocalPlayer = Players.LocalPlayer
local Camera = Workspace.CurrentCamera

-- =================================================================
-- 1. SYSTEM NOTIFIKASI (ZICK HUB THEME)
-- =================================================================

-- Mengambil User ID dari username 'Clockzoos'
local successId, userId = pcall(function()
    return Players:GetUserIdFromNameAsync("Clockzoos")
end)
if not successId then userId = 1 end

-- Mengambil URL Foto Avatar Resmi dengan API Thumbnail
local avatarUrl = "https://roblox.com"..tostring(userId).."&width=150&height=150&format=png"
pcall(function()
    avatarUrl = Players:GetUserThumbnailAsync(userId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size150x150)
end)

-- Otomatis salin link Discord ke Clipboard
if setclipboard then
    setclipboard("https://discord.gg/QxXPKCFx6")
elseif toclipboard then
    toclipboard("https://discord.gg/QxXPKCFx6")
end

-- Membuat ScreenGui Utama untuk Notifikasi
local ZickGui = Instance.new("ScreenGui")
ZickGui.Name = "Zick Hub"
ZickGui.ResetOnSpawn = false
ZickGui.DisplayOrder = 999

pcall(function()
    ZickGui.Parent = CoreGui
end)
if not ZickGui.Parent then
    ZickGui.Parent = LocalPlayer:WaitForChild("PlayerGui")
end

-- Fungsi Notifikasi Zick
local function Notify(duration)
    duration = duration or 5

    local ZickFrame = Instance.new("Frame")
    ZickFrame.Name = "ZickFrame"
    ZickFrame.Size = UDim2.new(0, 260, 0, 54)
    ZickFrame.AnchorPoint = Vector2.new(1, 1)
    ZickFrame.Position = UDim2.new(0.98, 0, 0.95, 0) 
    ZickFrame.BackgroundColor3 = Color3.fromRGB(20, 15, 30)
    ZickFrame.BackgroundTransparency = 1
    ZickFrame.ClipsDescendants = true
    ZickFrame.Parent = ZickGui

    local ZickCorner = Instance.new("UICorner")
    ZickCorner.Name = "ZickCorner"
    ZickCorner.CornerRadius = UDim.new(0, 27)
    ZickCorner.Parent = ZickFrame

    local ZickStroke = Instance.new("UIStroke")
    ZickStroke.Name = "ZickStroke"
    ZickStroke.Color = Color3.fromRGB(130, 50, 200)
    ZickStroke.Thickness = 1.5
    ZickStroke.Transparency = 1
    ZickStroke.Parent = ZickFrame

    local ZickAvatar = Instance.new("ImageLabel")
    ZickAvatar.Name = "ZickAvatar"
    ZickAvatar.Size = UDim2.new(0, 36, 0, 36)
    ZickAvatar.Position = UDim2.new(0, 10, 0, 9)
    ZickAvatar.BackgroundTransparency = 1
    ZickAvatar.Image = avatarUrl
    ZickAvatar.ImageTransparency = 1
    ZickAvatar.Parent = ZickFrame

    local ZickAvatarCorner = Instance.new("UICorner")
    ZickAvatarCorner.Name = "ZickAvatarCorner"
    ZickAvatarCorner.CornerRadius = UDim.new(1, 0)
    ZickAvatarCorner.Parent = ZickAvatar

    local ZickTitleLabel = Instance.new("TextLabel")
    ZickTitleLabel.Name = "ZickTitleLabel"
    ZickTitleLabel.Size = UDim2.new(1, -65, 0, 16)
    ZickTitleLabel.Position = UDim2.new(0, 56, 0, 11)
    ZickTitleLabel.BackgroundTransparency = 1
    ZickTitleLabel.Font = Enum.Font.GothamBold
    ZickTitleLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
    ZickTitleLabel.TextSize = 12
    ZickTitleLabel.Text = "Version Beta"
    ZickTitleLabel.TextXAlignment = Enum.TextXAlignment.Left
    ZickTitleLabel.TextTransparency = 1
    ZickTitleLabel.Parent = ZickFrame

    local ZickTextLabel = Instance.new("TextLabel")
    ZickTextLabel.Name = "ZickTextLabel"
    ZickTextLabel.Size = UDim2.new(1, -65, 0, 16)
    ZickTextLabel.Position = UDim2.new(0, 56, 0, 27)
    ZickTextLabel.BackgroundTransparency = 1
    ZickTextLabel.Font = Enum.Font.GothamMedium
    ZickTextLabel.TextColor3 = Color3.fromRGB(180, 160, 200)
    ZickTextLabel.TextSize = 11
    ZickTextLabel.Text = "Join Discord For Update"
    ZickTextLabel.TextXAlignment = Enum.TextXAlignment.Left
    ZickTextLabel.TextTransparency = 1
    ZickTextLabel.Parent = ZickFrame

    local ZickProgressBar = Instance.new("Frame")
    ZickProgressBar.Name = "ZickProgressBar"
    ZickProgressBar.Size = UDim2.new(1, -40, 0, 2)
    ZickProgressBar.Position = UDim2.new(0, 20, 1, -4)
    ZickProgressBar.BackgroundColor3 = Color3.fromRGB(160, 32, 240)
    ZickProgressBar.BackgroundTransparency = 1
    ZickProgressBar.BorderSizePixel = 0
    ZickProgressBar.Parent = ZickFrame
    
    local ZickProgressCorner = Instance.new("UICorner")
    ZickProgressCorner.Name = "ZickProgressCorner"
    ZickProgressCorner.CornerRadius = UDim.new(0, 1)
    ZickProgressCorner.Parent = ZickProgressBar

    -- Animasi Masuk
    local targetY = ZickFrame.Position.Y.Scale
    ZickFrame.Position = UDim2.new(ZickFrame.Position.X.Scale, 0, targetY + 0.05, 0)
    local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Quint, Enum.EasingDirection.Out)
    
    TweenService:Create(ZickFrame, tweenInfo, {BackgroundTransparency = 0.15, Position = UDim2.new(ZickFrame.Position.X.Scale, 0, targetY, 0)}):Play()
    TweenService:Create(ZickStroke, tweenInfo, {Transparency = 0}):Play()
    TweenService:Create(ZickAvatar, tweenInfo, {ImageTransparency = 0}):Play()
    TweenService:Create(ZickTitleLabel, tweenInfo, {TextTransparency = 0}):Play()
    TweenService:Create(ZickTextLabel, tweenInfo, {TextTransparency = 0}):Play()
    TweenService:Create(ZickProgressBar, tweenInfo, {BackgroundTransparency = 0}):Play()

    -- Progress Bar Animasi
    local progressTweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Linear)
    local progressTween = TweenService:Create(ZickProgressBar, progressTweenInfo, {Size = UDim2.new(0, 0, 0, 2)})
    progressTween:Play()

    -- Animasi Keluar
    task.delay(duration, function()
        local fadeOutInfo = TweenInfo.new(0.4, Enum.EasingStyle.Quint, Enum.EasingDirection.In)
        local fadeOut = TweenService:Create(ZickFrame, fadeOutInfo, {BackgroundTransparency = 1, Position = UDim2.new(ZickFrame.Position.X.Scale, 0, targetY + 0.05, 0)})
        TweenService:Create(ZickStroke, fadeOutInfo, {Transparency = 1}):Play()
        TweenService:Create(ZickAvatar, fadeOutInfo, {ImageTransparency = 1}):Play()
        TweenService:Create(ZickTitleLabel, fadeOutInfo, {TextTransparency = 1}):Play()
        TweenService:Create(ZickTextLabel, fadeOutInfo, {TextTransparency = 1}):Play()
        TweenService:Create(ZickProgressBar, fadeOutInfo, {BackgroundTransparency = 1}):Play()
        
        fadeOut:Play()
        fadeOut.Completed:Connect(function()
            ZickGui:Destroy()
        end)
    end)
end

-- Jalankan notifikasi saat script dimuat
task.spawn(function()
    Notify(5)
end)

-- =================================================================
-- 2. SYSTEM AUTO-FIRE & FOV CIRCLE
-- =================================================================

-- Konfigurasi Global
getgenv().shootoffset = getgenv().shootoffset or 0
getgenv().keybind = Enum.KeyCode.Q
getgenv().AutoFireEnabled = true

-- KONFIGURASI FOV CIRCLE (Warna Ungu)
local FOVRadius = 80 
local FOVCircle = Drawing.new("Circle")
FOVCircle.Thickness = 1.5
FOVCircle.Color = Color3.fromRGB(160, 32, 240)
FOVCircle.Filled = false
FOVCircle.Transparency = 0.8
FOVCircle.Visible = getgenv().AutoFireEnabled

-- Render Loop untuk memperbarui posisi FOV Circle
local FOVConnection
FOVConnection = RunService.RenderStepped:Connect(function()
    if FOVCircle then
        FOVCircle.Visible = getgenv().AutoFireEnabled
        FOVCircle.Radius = FOVRadius
        FOVCircle.Position = Vector2.new(Camera.ViewportSize.X / 2, Camera.ViewportSize.Y / 2)
    else
        FOVConnection:Disconnect()
    end
end)

-- Fungsi Wall Check
local function IsVisible(targetPart)
    local char = LocalPlayer.Character
    if not char or not char:FindFirstChild("HumanoidRootPart") then return false end
    
    local origin = Camera.CFrame.Position
    local destination = targetPart.Position
    local direction = destination - origin
    
    local raycastParams = RaycastParams.new()
    raycastParams.FilterDescendantsInstances = {char, Camera}
    raycastParams.FilterType = Enum.RaycastFilterType.Exclude
    raycastParams.IgnoreWater = true
    
    local raycastResult = Workspace:Raycast(origin, direction, raycastParams)
    
    if not raycastResult or raycastResult.Instance:IsDescendantOf(targetPart.Parent) then
        return true
    end
    return false
end

-- Mencari Player terdekat di dalam FOV
local function GetClosestPlayerInFOV()
    local closestTarget = nil
    local shortestFOVDistance = FOVRadius 
    local char = LocalPlayer.Character
    if not char then return nil end

    local centerScreen = Vector2.new(Camera.ViewportSize.X / 2, Camera.ViewportSize.Y / 2)

    for _, player in ipairs(Players:GetPlayers()) do
        if player ~= LocalPlayer and player.Character then
            local targetChar = player.Character
            if targetChar and targetChar:FindFirstChild("Humanoid") and targetChar.Humanoid.Health > 0 then
                local targetPart = targetChar:FindFirstChild("Head") or targetChar:FindFirstChild("HumanoidRootPart")
                
                if targetPart then
                    local screenPos, onScreen = Camera:WorldToViewportPoint(targetPart.Position)
                    
                    if onScreen then
                        local fovDist = (Vector2.new(screenPos.X, screenPos.Y) - centerScreen).Magnitude
                        if fovDist <= shortestFOVDistance then
                            if IsVisible(targetPart) then
                                shortestFOVDistance = fovDist
                                closestTarget = targetChar
                            end
                        end
                    end
                end
            end
        end
    end

    return closestTarget
end

-- Prediksi Posisi Target
local function PredictPosition(target, offset)
    local targetPart = target:FindFirstChild("Head") or target:FindFirstChild("HumanoidRootPart")
    if not targetPart then return nil end
    
    local velocity = targetPart.AssemblyLinearVelocity or targetPart.Velocity or Vector3.zero
    local ping = 0
    pcall(function() ping = LocalPlayer:GetNetworkPing() end)
    local pingAdjust = velocity * math.max(0, ping)
    return targetPart.Position + velocity * (offset / 15) + pingAdjust
end

-- Fungsi Tembak
local function Shoot()
    local char = LocalPlayer.Character
    if not char or not char:FindFirstChild("HumanoidRootPart") then return end
    
    local heldTool = char:FindFirstChildOfClass("Tool")
    if not heldTool then return end
    
    local shootRemote = heldTool:FindFirstChild("Shoot")
    if not shootRemote then return end
    
    local target = GetClosestPlayerInFOV()
    if not target then return end
    
    local predictedPos = PredictPosition(target, getgenv().shootoffset)
    if not predictedPos then return end
    
    local originCFrame = char.HumanoidRootPart.CFrame
    local targetCFrame = CFrame.new(predictedPos)
    local arg3 = 2 
    local arg4 = 1790484747.002867 
    
    local args = {
        originCFrame,
        targetCFrame,
        arg3,
        arg4
    }
    
    shootRemote:FireServer(unpack(args))
end

-- Loop Auto Fire
task.spawn(function()
    while task.wait(0.1) do 
        if getgenv().AutoFireEnabled then
            pcall(Shoot)
        end
    end
end)

-- Keybind Toggle (Tombol Q)
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if not gameProcessed and input.KeyCode == getgenv().keybind then
        getgenv().AutoFireEnabled = not getgenv().AutoFireEnabled
    end
end)

-- =================================================================
-- 3. OUTFIT FOR YOU UI
-- =================================================================

-- Membuat ScreenGui Utama untuk Outfit
local OutfitGui = Instance.new("ScreenGui")
OutfitGui.Name = "OutfitForYouGui"
OutfitGui.ResetOnSpawn = false
OutfitGui.DisplayOrder = 998

pcall(function()
    OutfitGui.Parent = CoreGui
end)
if not OutfitGui.Parent then
    OutfitGui.Parent = LocalPlayer:WaitForChild("PlayerGui")
end

-- Frame Utama UI
local MainFrame = Instance.new("Frame")
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0.28, 0, 0.45, 0)
MainFrame.Position = UDim2.new(0.02, 0, 0.25, 0)
MainFrame.BackgroundTransparency = 1
MainFrame.BorderSizePixel = 0
MainFrame.Active = true
MainFrame.Draggable = true
MainFrame.Parent = OutfitGui

local SizeConstraint = Instance.new("UISizeConstraint")
SizeConstraint.MinSize = Vector2.new(240, 220)
SizeConstraint.MaxSize = Vector2.new(320, 300)
SizeConstraint.Parent = MainFrame

-- Frame Content (Background & List)
local ContentFrame = Instance.new("Frame")
ContentFrame.Name = "ContentFrame"
ContentFrame.Size = UDim2.new(1, 0, 1, 0)
ContentFrame.BackgroundColor3 = Color3.fromRGB(20, 15, 30)
ContentFrame.BorderSizePixel = 0
ContentFrame.ClipsDescendants = true
ContentFrame.Parent = MainFrame

local MainCorner = Instance.new("UICorner")
MainCorner.CornerRadius = UDim.new(0, 10)
MainCorner.Parent = ContentFrame

local MainStroke = Instance.new("UIStroke")
MainStroke.Color = Color3.fromRGB(160, 32, 240)
MainStroke.Thickness = 1.5
MainStroke.Parent = ContentFrame

-- Top Bar (Header)
local TopBar = Instance.new("Frame")
TopBar.Name = "TopBar"
TopBar.Size = UDim2.new(1, 0, 0, 35)
TopBar.BackgroundColor3 = Color3.fromRGB(30, 20, 45)
TopBar.BorderSizePixel = 0
TopBar.Parent = MainFrame

local TopBarCorner = Instance.new("UICorner")
TopBarCorner.CornerRadius = UDim.new(0, 10)
TopBarCorner.Parent = TopBar

local TopBarStroke = Instance.new("UIStroke")
TopBarStroke.Color = Color3.fromRGB(160, 32, 240)
TopBarStroke.Thickness = 1.5
TopBarStroke.Parent = TopBar

-- Title Text
local TitleLabel = Instance.new("TextLabel")
TitleLabel.Name = "TitleLabel"
TitleLabel.Size = UDim2.new(0.75, 0, 1, 0)
TitleLabel.Position = UDim2.new(0.04, 0, 0, 0)
TitleLabel.BackgroundTransparency = 1
TitleLabel.Font = Enum.Font.GothamBold
TitleLabel.Text = "Outfit For You"
TitleLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
TitleLabel.TextScaled = true
TitleLabel.TextXAlignment = Enum.TextXAlignment.Left
TitleLabel.Parent = TopBar

local TitleSizeConstraint = Instance.new("UITextSizeConstraint")
TitleSizeConstraint.MaxTextSize = 13
TitleSizeConstraint.MinTextSize = 9
TitleSizeConstraint.Parent = TitleLabel

-- Toggle Button (+ / -)
local ToggleButton = Instance.new("TextButton")
ToggleButton.Name = "ToggleButton"
ToggleButton.Size = UDim2.new(0, 25, 0, 25)
ToggleButton.Position = UDim2.new(1, -30, 0.5, -12.5)
ToggleButton.BackgroundColor3 = Color3.fromRGB(160, 32, 240)
ToggleButton.Font = Enum.Font.GothamBold
ToggleButton.Text = "-"
ToggleButton.TextColor3 = Color3.fromRGB(255, 255, 255)
ToggleButton.TextSize = 16
ToggleButton.Parent = TopBar

local ButtonCorner = Instance.new("UICorner")
ButtonCorner.CornerRadius = UDim.new(0, 6)
ButtonCorner.Parent = ToggleButton

-- Scrolling Container
local ScrollContainer = Instance.new("ScrollingFrame")
ScrollContainer.Name = "ScrollContainer"
ScrollContainer.Size = UDim2.new(1, -16, 1, -45)
ScrollContainer.Position = UDim2.new(0, 8, 0, 40)
ScrollContainer.BackgroundTransparency = 1
ScrollContainer.BorderSizePixel = 0
ScrollContainer.ScrollBarThickness = 3
ScrollContainer.ScrollBarImageColor3 = Color3.fromRGB(160, 32, 240)
ScrollContainer.CanvasSize = UDim2.new(0, 0, 0, 0)
ScrollContainer.Parent = ContentFrame

local UIListLayout = Instance.new("UIListLayout")
UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
UIListLayout.Padding = UDim.new(0, 6)
UIListLayout.Parent = ScrollContainer

local UIPadding = Instance.new("UIPadding")
UIPadding.PaddingTop = UDim.new(0, 2)
UIPadding.PaddingBottom = UDim.new(0, 5)
UIPadding.Parent = ScrollContainer

UIListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
    ScrollContainer.CanvasSize = UDim2.new(0, 0, 0, UIListLayout.AbsoluteContentSize.Y + 10)
end)

-- Daftar Username
local outfits = {
    {Username = "koolkid_2722", Display = "@koolkid_2722"},
    {Username = "Alexander041914", Display = "@Alexander041914"},
    {Username = "f3arSN1x", Display = "@f3arSN1x"},
    {Username = "15kElixs", Display = "@15kElixs"},
    {Username = "IzJulienTheOne", Display = "@IzJulienTheOne"},
    {Username = "coolmanluke81", Display = "@coolmanluke81"},
    {Username = "D9utchy", Display = "@D9utchy"},
    {Username = "Ishraq198415", Display = "@Ishraq198415"},
    {Username = "OTFROB1234", Display = "@OTFROB1234"},
    {Username = "Vex_971", Display = "@Vex_971"},
    {Username = "zTwiisted", Display = "@zTwiisted"},
    {Username = "IceblueNinjax", Display = "@IceblueNinjax"},
    {Username = "knocries", Display = "@knocries"},
    {Username = "OneElite", Display = "@OneElite"},
    {Username = "chicymunk", Display = "@chicymunk"},
    {Username = "jqckfr", Display = "@jqckfr"}
}

-- Fungsi Apply Outfit
local function ApplyOutfit(targetUserId)
    local args = { targetUserId }
    pcall(function()
        ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Character"):WaitForChild("ApplyCharacter"):FireServer(unpack(args))
    end)
end

-- Generasi Item List
for i, outfitData in ipairs(outfits) do
    local ItemFrame = Instance.new("Frame")
    ItemFrame.Name = "ItemFrame_" .. i
    ItemFrame.Size = UDim2.new(1, -6, 0, 30)
    ItemFrame.BackgroundColor3 = Color3.fromRGB(35, 25, 50)
    ItemFrame.Parent = ScrollContainer

    local ItemCorner = Instance.new("UICorner")
    ItemCorner.CornerRadius = UDim.new(0, 6)
    ItemCorner.Parent = ItemFrame

    local OutfitLabel = Instance.new("TextLabel")
    OutfitLabel.Name = "OutfitLabel"
    OutfitLabel.Size = UDim2.new(0.72, 0, 1, 0)
    OutfitLabel.Position = UDim2.new(0, 8, 0, 0)
    OutfitLabel.BackgroundTransparency = 1
    OutfitLabel.Font = Enum.Font.GothamMedium
    OutfitLabel.Text = outfitData.Display
    OutfitLabel.TextColor3 = Color3.fromRGB(200, 180, 230)
    OutfitLabel.TextScaled = true
    OutfitLabel.TextXAlignment = Enum.TextXAlignment.Left
    OutfitLabel.Parent = ItemFrame

    local LabelSizeConstraint = Instance.new("UITextSizeConstraint")
    LabelSizeConstraint.MaxTextSize = 11
    LabelSizeConstraint.MinTextSize = 8
    LabelSizeConstraint.Parent = OutfitLabel

    local UseButton = Instance.new("TextButton")
    UseButton.Name = "UseButton"
    UseButton.Size = UDim2.new(0.22, 0, 0.7, 0)
    UseButton.Position = UDim2.new(0.96, 0, 0.5, 0)
    UseButton.AnchorPoint = Vector2.new(1, 0.5)
    UseButton.BackgroundColor3 = Color3.fromRGB(160, 32, 240)
    UseButton.Font = Enum.Font.GothamBold
    UseButton.Text = "Use"
    UseButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    UseButton.TextScaled = true
    UseButton.Parent = ItemFrame

    local ButtonSizeConstraint = Instance.new("UITextSizeConstraint")
    ButtonSizeConstraint.MaxTextSize = 11
    ButtonSizeConstraint.MinTextSize = 8
    ButtonSizeConstraint.Parent = UseButton

    local UseCorner = Instance.new("UICorner")
    UseCorner.CornerRadius = UDim.new(0, 4)
    UseCorner.Parent = UseButton

    UseButton.MouseButton1Click:Connect(function()
        task.spawn(function()
            local success, targetId = pcall(function()
                return Players:GetUserIdFromNameAsync(outfitData.Username)
            end)

            if success and targetId then
                ApplyOutfit(targetId)
            end
        end)
    end)
end

-- Sistem Open / Close (+ / -)
local isExpanded = true

ToggleButton.MouseButton1Click:Connect(function()
    isExpanded = not isExpanded
    local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Quart, Enum.EasingDirection.Out)
    
    if isExpanded then
        ToggleButton.Text = "-"
        ContentFrame.Visible = true
        TweenService:Create(MainFrame, tweenInfo, {Size = UDim2.new(0.28, 0, 0.45, 0)}):Play()
        TweenService:Create(ContentFrame, tweenInfo, {Size = UDim2.new(1, 0, 1, 0)}):Play()
    else
        ToggleButton.Text = "+"
        local hideTween = TweenService:Create(ContentFrame, tweenInfo, {Size = UDim2.new(1, 0, 0, 35)})
        TweenService:Create(MainFrame, tweenInfo, {Size = UDim2.new(0.28, 0, 0, 35)}):Play()
        hideTween:Play()
        
        hideTween.Completed:Connect(function()
            if not isExpanded then
                ContentFrame.Visible = false
            end
        end)
    end
end)
        `);
    } else {
        // =========================================================
        // B. DIBUKA DARI BROWSER -> TAMPILKAN UI DENIED + SOUND
        // =========================================================
        res.setHeader('Content-Type', 'text/html');
        return res.status(403).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>403 Access Denied - Zick Security</title>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                        background-color: #0b0b0e;
                        color: #ffffff;
                        font-family: 'Courier New', Courier, monospace;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        padding: 20px;
                        cursor: pointer;
                    }
                    .card {
                        background: #121217;
                        border: 1px solid #d9264e;
                        padding: 35px 25px;
                        border-radius: 12px;
                        text-align: center;
                        max-width: 380px;
                        width: 100%;
                        box-shadow: 0 0 25px rgba(217, 38, 78, 0.25);
                    }
                    .sub-header {
                        color: #d9264e;
                        font-size: 11px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        margin-bottom: 25px;
                        text-transform: uppercase;
                    }
                    .dot {
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background-color: #d9264e;
                        margin-right: 6px;
                        vertical-align: middle;
                        animation: blink 1s infinite;
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.2; }
                    }
                    h1 {
                        font-size: 26px;
                        color: #ffffff;
                        margin-bottom: 12px;
                        line-height: 1.3;
                        letter-spacing: 1px;
                        font-weight: bold;
                    }
                    p {
                        color: #8a8a93;
                        font-size: 13px;
                        line-height: 1.6;
                        margin-bottom: 20px;
                    }
                    p b { color: #ffffff; }
                    .avatar-container { margin: 15px 0 25px 0; }
                    .avatar {
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                        border: 2px solid #d9264e;
                        object-fit: cover;
                        box-shadow: 0 0 15px rgba(217, 38, 78, 0.3);
                    }
                    .btn-discord {
                        display: inline-block;
                        background: #d9264e;
                        color: #ffffff;
                        padding: 12px 28px;
                        border-radius: 6px;
                        text-decoration: none;
                        font-weight: bold;
                        font-size: 13px;
                        letter-spacing: 1px;
                        transition: all 0.2s ease;
                    }
                    .btn-discord:hover {
                        background: #b51c3e;
                        box-shadow: 0 0 15px rgba(217, 38, 78, 0.5);
                        transform: translateY(-2px);
                    }
                    .footer {
                        font-size: 10px;
                        color: #4a4a52;
                        margin-top: 30px;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                </style>
            </head>
            <body>
                <audio id="secAudio" loop preload="auto">
                    <source src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6f8a32b69.mp3" type="audio/mpeg">
                </audio>
                <div class="card">
                    <div class="sub-header">
                        <span class="dot"></span>ZICK SECURITY // ACCESS DENIED
                    </div>
                    <h1>SMILE.<br>YOU'RE BEING LOGGED.</h1>
                    <p>This request has been recorded by <b>Zick Security</b>.<br>Protected source extraction is not permitted.</p>
                    <div class="avatar-container">
                        <img class="avatar" src="https://cdn.discordapp.com/attachments/1371517599409508477/1553669979361116250/gate-avatar.gif?ex=6aba176c&is=6ab8c5ec&hm=20549817889415daf7a1ffd447ae946206ffe159c72519591429ef0f57220493&" alt="Mococo Avatar">
                    </div>
                    <a href="https://discord.gg/QxXPKCFx6" target="_blank" class="btn-discord">JOIN DISCORD ↗</a>
                    <div class="footer">
                        REQUEST 8CDD4C8F · HTTP 403 · ZICK ACCESS GATE
                    </div>
                </div>
                <script>
                    document.body.addEventListener('click', function() {
                        var audio = document.getElementById('secAudio');
                        if (audio.paused) {
                            audio.volume = 0.4;
                            audio.play().catch(function(e) { console.log('Audio error:', e); });
                        }
                    }, { once: true });
                </script>
            </body>
            </html>
        `);
    }
}
