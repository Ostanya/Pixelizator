package world.ucode;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

@WebServlet("/corrupted")
@MultipartConfig
public class Corrupted extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Part part = req.getPart("file");
            BufferedImage image = ImageIO.read(part.getInputStream()); //image get
            BufferedImage bufferedImage = new BufferedImage(image.getWidth(), image.getHeight(), image.getType());
            if (checkCorrupt(image, bufferedImage))
                resp.setStatus(200);
        } catch (Exception e) {
            resp.setStatus(406);
        }
    }

    private boolean checkCorrupt(BufferedImage A, BufferedImage B) {
        for (int i = 0; i < A.getHeight(); i++) {
            for (int j = 0; j < A.getWidth(); j++) {
                if (A.getRGB(j, i) != B.getRGB(j, i)) {
                    return false;
                }
            }
        }
        return true;
    }
}

