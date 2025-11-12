import {
	Email,
	Facebook,
	LinkedIn,
	LocationOn,
	Medication,
	Phone,
	X,
} from "@mui/icons-material";
import { Box, Grid, Typography, useTheme } from "@mui/material";

export function Footer() {
	const DEPARTMENTS = [
		"Human Resources",
		"Manufacturing",
		"Sales & Marketing",
		"IT Services",
		"Payroll & Benefits",
	];

	const QUICK_LINKS = [
		"Benefits Information",
		"Training Resources",
		"Safety Guidelines",
		"IT Support",
	];

	const linkStyleSx = {
		color: "grey.50",
		textDecoration: "none",
		"&:hover": { color: "primary.light" },
	};
	const theme = useTheme();
	console.log(theme.palette);

	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "primary.main",
				color: "grey.50",
				pt: 6,
				pb: 2,
				px: 4,
				mt: 4,
			}}
		>
			<Grid container spacing={6}>
				{/* Information */}
				<Grid size={{ xs: 12, md: 3 }}>
					<Box
						sx={{
							display: "flex",
							textAlign: "left",
							flexDirection: "column",
							gap: 2,
						}}
					>
						<Box>
							<Typography
								variant="h6"
								component="div"
								noWrap
								sx={{
									display: "flex",
									alignItems: "center",
									fontWeight: "bold",
								}}
							>
								<Medication sx={{ color: "grey.50", mr: 1 }} />
								SWE PHARMA
							</Typography>
						</Box>
						<Typography
							variant="body1"
							component="div"
							sx={{ color: "link.main", fontSize: "0.9rem" }}
						>
							Leading pharmaceutical innovation since 1985. Committed to
							improving lives through cutting-edge research and development of
							life-saving medications.
						</Typography>
						<Box sx={{ display: "flex", gap: 2 }}>
							<LinkedIn sx={{ color: "link.main" }} />
							<X sx={{ color: "link.main" }} />
							<Facebook sx={{ color: "link.main" }} />
						</Box>
					</Box>
				</Grid>

				{/* Departments */}
				<Grid size={{ xs: 6, sm: 4, md: 3 }}>
					<Box
						sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
					>
						<Typography
							variant="h6"
							component="h4"
							sx={{ fontWeight: "bold", mb: 2 }}
						>
							Departments
						</Typography>
						{DEPARTMENTS.map((dept) => (
							<Typography
								key={dept}
								variant="body1"
								component="a"
								href="#"
								sx={{
									...linkStyleSx,
									mb: 1,
								}}
							>
								{dept}
							</Typography>
						))}
					</Box>
				</Grid>

				{/* Quick Links */}
				<Grid size={{ xs: 6, sm: 4, md: 3 }}>
					<Box
						sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
					>
						<Typography
							variant="h6"
							component="h4"
							sx={{ fontWeight: "bold", mb: 2 }}
						>
							Quick Links
						</Typography>
						{QUICK_LINKS.map((link) => (
							<Typography
								key={link}
								variant="body1"
								component="a"
								href="#"
								noWrap
								sx={{
									...linkStyleSx,
									mb: 1,
								}}
							>
								{link}
							</Typography>
						))}
					</Box>
				</Grid>

				{/* Contact Information */}
				<Grid size={{ xs: 6, sm: 4, md: 3 }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							textAlign: "left",
							gap: 0.8,
						}}
					>
						<Typography
							variant="h6"
							component="h4"
							sx={{ fontWeight: "bold", mb: 2 }}
						>
							Contact Us
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "start",
								alignItems: "center",
								mb: 1,
							}}
						>
							<LocationOn
								fontSize="small"
								sx={{ mr: 2, color: "link.main" }}
							/>
							<Typography
								variant="body1"
								component="a"
								href="#"
								sx={linkStyleSx}
							>
								1 Lomb Memorial Dr, Rochester, NY 14623
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "start",
								alignItems: "center",
								mb: 1,
							}}
						>
							<Phone fontSize="small" sx={{ mr: 2, color: "link.main" }} />
							<Typography
								variant="body1"
								component="a"
								href="#"
								noWrap
								sx={linkStyleSx}
							>
								+1 (917) 517-5963
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "start",
								alignItems: "center",
							}}
						>
							<Email fontSize="small" sx={{ mr: 2, color: "link.main" }} />
							<Typography
								variant="body1"
								component="a"
								href="#"
								noWrap
								sx={linkStyleSx}
							>
								hk2383@rit.edu
							</Typography>
						</Box>
					</Box>
				</Grid>

				{/* Bottom Section */}
				<Grid
					size={12}
					sx={{ borderTop: "1px solid #fff", mt: 1, p: 2, textAlign: "center" }}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							justifyContent: "space-between",
							alignItems: "center",
							gap: 2,
							mt: 2,
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								gap: 3,
								mb: { xs: 2, md: 0 },
							}}
						>
							<Typography
								variant="body2"
								component="a"
								href="#"
								sx={linkStyleSx}
							>
								Privacy Policy
							</Typography>
							<Typography
								variant="body2"
								component="a"
								href="#"
								sx={linkStyleSx}
							>
								Terms & Conditions
							</Typography>
							<Typography
								variant="body2"
								component="a"
								href="#"
								sx={linkStyleSx}
							>
								FDA Compliance
							</Typography>
							<Typography
								variant="body2"
								component="a"
								href="#"
								sx={linkStyleSx}
							>
								Regulatory Information
							</Typography>
						</Box>

						<Typography variant="body2" sx={{ color: "link.main" }}>
							&copy; {`${currentYear} SWE PHARMA. All rights reserved.`}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Footer;
