package actors;

import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;

public class Actor {
    private final WebDriver page;

    public Actor(WebDriver page) {
        this.page = page;
    }

    @SafeVarargs
    public final void attemptsTo(Consumer<WebDriver>... task) {
        for (Consumer<WebDriver> t : task) {
            t.accept(page);
        }
    }

    public WebDriver getPage() {
        return page;
    }
}
