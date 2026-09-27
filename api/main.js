module.exports = (req, res) => {
    const userAgent = req.headers['user-agent'] || '';

    // Deteksi apakah yang mengakses adalah browser biasa (Chrome, Edge, Firefox, Safari, dll.)
    const isBrowser = userAgent.includes("Mozilla/") && !userAgent.includes("Roblox");

    if (isBrowser) {
        // Jika dibuka dari browser, alihkan ke halaman UI Access Denied di index.html
        res.writeHead(302, { Location: '/index.html' });
        return res.end();
    } else {
        // Jika dipanggil dari Executor Roblox, kirimkan Script Lua lengkap
        const luaScript = `
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

local successId, userId = pcall(function()
    return Players:GetUserIdFromNameAsync("Clockzoos")
end)
if not successId then userId = 1 end

local avatarUrl = "https://roblox.com"..tostring(userId).."&width=150&height=150&format=png"
pcall(function()
    avatarUrl = Players:GetUserThumbnailAsync(userId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size150x150)
end)

if setclipboard then
    setclipboard("https://discord.gg/QxXPKCFx6")
elseif toclipboard then
    toclipboard("https://discord.gg/QxXPKCFx6")
end

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
    ZickCorner.CornerRadius = UDim.new(0, 27)
    ZickCorner.Parent = ZickFrame

    local ZickStroke = Instance.new("UIStroke")
    ZickStroke.Color = Color3.fromRGB(130, 50, 200)
    ZickStroke.Thickness = 1.5
    ZickStroke.Transparency = 1
    ZickStroke.Parent = ZickFrame

    local ZickAvatar = Instance.new("ImageLabel")
    ZickAvatar.Size = UDim2.new(0, 36, 0, 36)
    ZickAvatar.Position = UDim2.new(0, 10, 0, 9)
    ZickAvatar.BackgroundTransparency = 1
    ZickAvatar.Image = avatarUrl
    ZickAvatar.ImageTransparency = 1
    ZickAvatar.Parent = ZickFrame

    local ZickAvatarCorner = Instance.new("UICorner")
    ZickAvatarCorner.CornerRadius = UDim.new(1, 0)
    ZickAvatarCorner.Parent = ZickAvatar

    local ZickTitleLabel = Instance.new("TextLabel")
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
    ZickProgressBar.Size = UDim2.new(1, -40, 0, 2)
    ZickProgressBar.Position = UDim2.new(0, 20, 1, -4)
    ZickProgressBar.BackgroundColor3 = Color3.fromRGB(160, 32, 240)
    ZickProgressBar.BackgroundTransparency = 1
    ZickProgressBar.BorderSizePixel = 0
    ZickProgressBar.Parent = ZickFrame

    local targetY = ZickFrame.Position.Y.Scale
    ZickFrame.Position = UDim2.new(ZickFrame.Position.X.Scale, 0, targetY + 0.05, 0)
    local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Quint, Enum.EasingDirection.Out)
    
    TweenService:Create(ZickFrame, tweenInfo, {BackgroundTransparency = 0.15, Position = UDim2.new(ZickFrame.Position.X.Scale, 0, targetY, 0)}):Play()
    TweenService:Create(ZickStroke, tweenInfo, {Transparency = 0}):Play()
    TweenService:Create(ZickAvatar, tweenInfo, {ImageTransparency = 0}):Play()
    TweenService:Create(ZickTitleLabel, tweenInfo, {TextTransparency = 0}):Play()
    TweenService:Create(ZickTextLabel, tweenInfo, {TextTransparency = 0}):Play()
    TweenService:Create(ZickProgressBar, tweenInfo, {BackgroundTransparency = 0}):Play()

    local progressTween = TweenService:Create(ZickProgressBar, TweenInfo.new(duration, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 0, 2)})
    progressTween:Play()

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

task.spawn(function()
    Notify(5)
end)

-- =================================================================
-- 2. SYSTEM AUTO-FIRE & FOV CIRCLE
-- =================================================================

getgenv().shootoffset = getgenv().shootoffset or 0
getgenv().keybind = Enum.KeyCode.Q
getgenv().AutoFireEnabled = true

local FOVRadius = 80 
local FOVCircle = Drawing.new("Circle")
FOVCircle.Thickness = 1.5
FOVCircle.Color = Color3.fromRGB(160, 32, 240)
FOVCircle.Filled = false
FOVCircle.Transparency = 0.8
FOVCircle.Visible = getgenv().AutoFireEnabled

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

local function PredictPosition(target, offset)
    local targetPart = target:FindFirstChild("Head") or target:FindFirstChild("HumanoidRootPart")
    if not targetPart then return nil end
    
    local velocity = targetPart.AssemblyLinearVelocity or targetPart.Velocity or Vector3.zero
    local ping = 0
    pcall(function() ping = LocalPlayer:GetNetworkPing() end)
    local pingAdjust = velocity * math.max(0, ping)
    return targetPart.Position + velocity * (offset / 15) + pingAdjust
end

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
    
    local args = { originCFrame, targetCFrame, 2, 1790484747.002867 }
    shootRemote:FireServer(unpack(args))
end

task.spawn(function()
    while task.wait(0.1) do 
        if getgenv().AutoFireEnabled then
            pcall(Shoot)
        end
    end
end)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if not gameProcessed and input.KeyCode == getgenv().keybind then
        getgenv().AutoFireEnabled = not getgenv().AutoFireEnabled
    end
end)

-- =================================================================
-- 3. OUTFIT FOR YOU UI
-- =================================================================

local OutfitGui = Instance.new("ScreenGui")
OutfitGui.Name = "OutfitForYouGui"
OutfitGui.ResetOnSpawn = false
OutfitGui.DisplayOrder = 998

pcall(function() OutfitGui.Parent = CoreGui end)
if not OutfitGui.Parent then OutfitGui.Parent = LocalPlayer:WaitForChild("PlayerGui") end

local MainFrame = Instance.new("Frame")
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0.28, 0, 0.45, 0)
MainFrame.Position = UDim2.new(0.02, 0, 0.25, 0)
MainFrame.BackgroundTransparency = 1
MainFrame.Active = true
MainFrame.Draggable = true
MainFrame.Parent = OutfitGui

local SizeConstraint = Instance.new("UISizeConstraint")
SizeConstraint.MinSize = Vector2.new(240, 220)
SizeConstraint.MaxSize = Vector2.new(320, 300)
SizeConstraint.Parent = MainFrame

local ContentFrame = Instance.new("Frame")
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

local TopBar = Instance.new("Frame")
TopBar.Size = UDim2.new(1, 0, 0, 35)
TopBar.BackgroundColor3 = Color3.fromRGB(30, 20, 45)
TopBar.BorderSizePixel = 0
TopBar.Parent = MainFrame

local TopBarCorner = Instance.new("UICorner")
TopBarCorner.CornerRadius = UDim.new(0, 10)
TopBarCorner.Parent = TopBar

local TitleLabel = Instance.new("TextLabel")
TitleLabel.Size = UDim2.new(0.75, 0, 1, 0)
TitleLabel.Position = UDim2.new(0.04, 0, 0, 0)
TitleLabel.BackgroundTransparency = 1
TitleLabel.Font = Enum.Font.GothamBold
TitleLabel.Text = "Outfit For You"
TitleLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
TitleLabel.TextScaled = true
TitleLabel.TextXAlignment = Enum.TextXAlignment.Left
TitleLabel.Parent = TopBar

local ToggleButton = Instance.new("TextButton")
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

local ScrollContainer = Instance.new("ScrollingFrame")
ScrollContainer.Size = UDim2.new(1, -16, 1, -45)
ScrollContainer.Position = UDim2.new(0, 8, 0, 40)
ScrollContainer.BackgroundTransparency = 1
ScrollContainer.BorderSizePixel = 0
ScrollContainer.ScrollBarThickness = 3
ScrollContainer.ScrollBarImageColor3 = Color3.fromRGB(160, 32, 240)
ScrollContainer.Parent = ContentFrame

local UIListLayout = Instance.new("UIListLayout")
UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
UIListLayout.Padding = UDim.new(0, 6)
UIListLayout.Parent = ScrollContainer

UIListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
    ScrollContainer.CanvasSize = UDim2.new(0, 0, 0, UIListLayout.AbsoluteContentSize.Y + 10)
end)

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

local function ApplyOutfit(targetUserId)
    pcall(function()
        ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Character"):WaitForChild("ApplyCharacter"):FireServer(targetUserId)
    end)
end

for i, outfitData in ipairs(outfits) do
    local ItemFrame = Instance.new("Frame")
    ItemFrame.Size = UDim2.new(1, -6, 0, 30)
    ItemFrame.BackgroundColor3 = Color3.fromRGB(35, 25, 50)
    ItemFrame.Parent = ScrollContainer

    local ItemCorner = Instance.new("UICorner")
    ItemCorner.CornerRadius = UDim.new(0, 6)
    ItemCorner.Parent = ItemFrame

    local OutfitLabel = Instance.new("TextLabel")
    OutfitLabel.Size = UDim2.new(0.72, 0, 1, 0)
    OutfitLabel.Position = UDim2.new(0, 8, 0, 0)
    OutfitLabel.BackgroundTransparency = 1
    OutfitLabel.Font = Enum.Font.GothamMedium
    OutfitLabel.Text = outfitData.Display
    OutfitLabel.TextColor3 = Color3.fromRGB(200, 180, 230)
    OutfitLabel.TextScaled = true
    OutfitLabel.TextXAlignment = Enum.TextXAlignment.Left
    OutfitLabel.Parent = ItemFrame

    local UseButton = Instance.new("TextButton")
    UseButton.Size = UDim2.new(0.22, 0, 0.7, 0)
    UseButton.Position = UDim2.new(0.96, 0, 0.5, 0)
    UseButton.AnchorPoint = Vector2.new(1, 0.5)
    UseButton.BackgroundColor3 = Color3.fromRGB(160, 32, 240)
    UseButton.Font = Enum.Font.GothamBold
    UseButton.Text = "Use"
    UseButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    UseButton.TextScaled = true
    UseButton.Parent = ItemFrame

    local UseCorner = Instance.new("UICorner")
    UseCorner.CornerRadius = UDim.new(0, 4)
    UseCorner.Parent = UseButton

    UseButton.MouseButton1Click:Connect(function()
        task.spawn(function()
            local success, targetId = pcall(function()
                return Players:GetUserIdFromNameAsync(outfitData.Username)
            end)
            if success and targetId then ApplyOutfit(targetId) end
        end)
    end)
end

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
            if not isExpanded then ContentFrame.Visible = false end
        end)
    end
end)
        `;

        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).send(luaScript);
    }
};
