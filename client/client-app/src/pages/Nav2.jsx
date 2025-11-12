import { Medication, Notifications, Person } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { Link } from "react-router";

const PAGES = ["Payroll", "Manufacturing", "HR", "Sales", "IT"];

function Navigation() {
	const [anchorElNavMenu, setAnchorElNavMenu] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNavMenu(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNavMenu(null);
	};

	return (
		<AppBar position="static" sx={{ width: "100%" }}>
			<Container sx={{ maxWidth: "100% !important" }}>
				<Toolbar disableGutters>
					{/*
            Layout for Medium to Large Displays

            Logo -> Links -> User
           */}
					<a href="/" style={{ textDecoration: "none" }}>
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 4,
								display: { xs: "none", md: "flex" },
								alignItems: "center",
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".2rem",
								color: "grey.50",
								textDecoration: "none",
							}}
						>
							<Medication sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
							SWE PHARMA
						</Typography>
					</a>

					<Box
						sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: 3 } }}
					>
						{PAGES.map((page) => (
							<a
								key={page}
								href={`/${page.toLowerCase()}`}
								style={{ textDecoration: "none" }}
							>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: "grey.50",
										display: "block",
										transition:
											"transform 0.1s ease, background-color 0.1s ease",
										"&:hover": {
											backgroundColor: "primary.dark",
											transform: "scale(1.05)",
										},
									}}
								>
									{page}
								</Button>
							</a>
						))}
					</Box>

					{/*
            Layout for Small to Medium Displays

            Menu -> Logo -> User
          */}
					<Box
						sx={{
							width: "100%",
							display: { xs: "flex", md: "none" },
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Box>
							<IconButton
								size="large"
								onClick={handleOpenNavMenu}
								sx={{
									color: "grey.50",
								}}
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-bar"
								anchorEl={anchorElNavMenu}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								keepMounted
								open={Boolean(anchorElNavMenu)}
								onClose={handleCloseNavMenu}
								sx={{ display: { xs: "block", md: "none" } }}
							>
								{PAGES.map((page) => (
									<a
										key={page}
										href={`/${page.toLowerCase()}`}
										style={{ textDecoration: "none" }}
									>
										<MenuItem onClick={handleCloseNavMenu}>
											<Typography
												sx={{ textAlign: "center", color: "text.primary" }}
											>
												{page}
											</Typography>
										</MenuItem>
									</a>
								))}
							</Menu>
						</Box>

						<a
							href="/"
							style={{
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
							}}
						>
							<Medication sx={{ mr: 1, color: "grey.50" }} />
							<Typography
								variant="h5"
								noWrap
								sx={{
									mr: 2,
									display: { xs: "flex", md: "none" },
									flexGrow: 1,
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".2rem",
									color: "grey.50",
									textDecoration: "none",
								}}
							>
								SWE PHARMA
							</Typography>
						</a>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default memo(Navigation);